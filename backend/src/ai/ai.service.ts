import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import FormData from 'form-data';
import { PrismaService } from '../prisma/prisma.service';
import { SupabaseService } from './supabase.service';
import { QuestService } from '../quest/quest.service';
import { AchievementService } from '../achievement/achievement.service';
import { MissionType } from 'generated/prisma/enums'; // Adjust path if needed
import { Achievement } from 'generated/prisma/client';

const CONFIDENCE_THRESHOLD = 85;

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly AI_URL =
    process.env.GOOGLE_CLOUD_AI_URL || 'http://localhost:8000/predict';

  constructor(
    private prisma: PrismaService,
    private supabaseService: SupabaseService,
    private questService: QuestService,
    private achievementService: AchievementService,
  ) {}

  async predict(file: Express.Multer.File, clerkId: string) {
    try {
      const aiData = await this.fetchAiPrediction(file);
      const normalizedName = aiData.class_name.replace(/_/g, ' ');

      const animal = await this.prisma.animal.findFirst({
        where: { name: { equals: normalizedName, mode: 'insensitive' } },
      });

      const uploadedImageUrl = await this.supabaseService.uploadImage(file);

      const isFirstDiscovery = await this.processUserScan(
        clerkId,
        animal,
        aiData.confidence,
        uploadedImageUrl,
      );

      let unlockedAchievements: any[] = [];
      const user = await this.prisma.user.findUnique({ where: { clerkId } });

      if (!user) {
        throw new Error('User not found');
      }

      // If animal is not in DB, just return the unknown response
      if (!animal) {
        this.logger.warn(
          `Animal '${normalizedName}' found by AI but missing in DB.`,
        );
        const response = this.formatUnknownResponse(
          normalizedName,
          aiData.confidence,
        );
        return { ...response, unlockedAchievements };
      }

      // 🏆 ACHIEVEMENT: Eagle Eye (High AI Confidence)
      if (aiData.confidence >= 98) {
        const perfectScanAch = await this.achievementService.updateProgress(
          user.id,
          'PERFECT_SCAN',
          1,
        );
        unlockedAchievements.push(...perfectScanAch);
      }

      // Only trigger these if the user hasn't scanned this animal before
      if (isFirstDiscovery) {
        // 🏆 ACHIEVEMENT: Scan Count
        const scanAchievements = await this.achievementService.updateProgress(
          user.id,
          'SCAN_COUNT',
          1,
        );
        unlockedAchievements.push(...scanAchievements);

        // 🏆 ACHIEVEMENT: Points Earned (Pass the animal's point value instead of "1")
        if (animal.pointsReward > 0) {
          const pointsAchievements =
            await this.achievementService.updateProgress(
              user.id,
              'POINTS_EARNED',
              animal.pointsReward,
            );
          unlockedAchievements.push(...pointsAchievements);
        }

        // 🏆 ACHIEVEMENT: Rarity
        if (animal.rarityLevel === 'RARE') {
          const rareAch = await this.achievementService.updateProgress(
            user.id,
            'COLLECT_RARITY_RARE',
            1,
          );
          unlockedAchievements.push(...rareAch);
        } else if (animal.rarityLevel === 'LEGENDARY') {
          const legAch = await this.achievementService.updateProgress(
            user.id,
            'COLLECT_RARITY_LEGENDARY',
            1,
          );
          unlockedAchievements.push(...legAch);
        }

        // 🏆 ACHIEVEMENT: Habitat
        if (animal.habitat) {
          const habitat = animal.habitat.toLowerCase();
          if (habitat.includes('rainforest')) {
            const habAch = await this.achievementService.updateProgress(
              user.id,
              'COLLECT_HABITAT_RAINFOREST',
              1,
            );
            unlockedAchievements.push(...habAch);
          } else if (habitat.includes('desert')) {
            const habAch = await this.achievementService.updateProgress(
              user.id,
              'COLLECT_HABITAT_DESERT',
              1,
            );
            unlockedAchievements.push(...habAch);
          } else if (habitat.includes('river')) {
            const habAch = await this.achievementService.updateProgress(
              user.id,
              'COLLECT_HABITAT_RIVER',
              1,
            );
            unlockedAchievements.push(...habAch);
          } else if (habitat.includes('farm')) {
            const habAch = await this.achievementService.updateProgress(
              user.id,
              'COLLECT_HABITAT_FARM',
              1,
            );
            unlockedAchievements.push(...habAch);
          }
        }

        // 🎯 Trigger specific Quest (Mission) progress
        // (Assuming you updated this to 'SCAN_ANIMAL' in your Prisma schema previously)
        await this.questService.handleActionTrigger(
          user.id,
          'SCAN_ANIMAL',
          animal.id,
        );
      }

      const response = this.formatSuccessResponse(
        animal,
        aiData.confidence,
        isFirstDiscovery,
      );

      return { ...response, unlockedAchievements };
    } catch (error: any) {
      this.logger.error('AI Service Error', error.message);
      throw new Error('Failed to connect to AI Model Service');
    }
  }

  private async fetchAiPrediction(file: Express.Multer.File) {
    const formData = new FormData();
    formData.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    const { data } = await axios.post(this.AI_URL, formData, {
      headers: formData.getHeaders(),
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
    return data;
  }

  private async processUserScan(
    clerkId: string,
    animal: any,
    confidence: number,
    imageUrl: string | null,
  ): Promise<boolean> {
    if (!clerkId) return false;

    const user = await this.prisma.user.findUnique({ where: { clerkId } });
    if (!user) return false;

    await this.prisma.scanLog.create({
      data: {
        userId: user.id,
        status: animal ? 'SUCCESS' : 'UNKNOWN_ANIMAL',
        predictedAnimalId: animal ? animal.id : null,
        confidenceScore: confidence,
        imageUrl: imageUrl,
      },
    });

    if (animal) {
      const existingCollection = await this.prisma.userCollection.findUnique({
        where: { userId_animalId: { userId: user.id, animalId: animal.id } },
      });

      if (!existingCollection) {
        await this.prisma.$transaction([
          this.prisma.userCollection.create({
            data: {
              userId: user.id,
              animalId: animal.id,
              isFirstDiscovery: true,
            },
          }),
          this.prisma.user.update({
            where: { id: user.id },
            data: {
              currentPoints: { increment: animal.pointsReward },
              totalPointsEarned: { increment: animal.pointsReward },
            },
          }),
        ]);
        return true;
      }
    }
    return false;
  }

  private formatSuccessResponse(
    animal: any,
    confidence: number,
    isFirstDiscovery: boolean,
  ) {
    return {
      id: animal.id,
      class_name: animal.name,
      scientific_name: animal.scientificName,
      description: animal.description,
      habitat: animal.habitat,
      fun_fact: animal.funFact,
      rarity: this.formatRarity(animal.rarityLevel),
      confidence: confidence,
      imageUrl: animal.imageUrl,
      points_reward: animal.pointsReward,
      isNewDiscovery: isFirstDiscovery,
    };
  }

  private formatUnknownResponse(className: string, confidence: number) {
    return {
      class_name: className,
      confidence: confidence,
      fun_fact: 'New discovery! Data coming soon.',
      rarity: 'Common',
      isNewDiscovery: false,
    };
  }

  private formatRarity(rarity: string): string {
    if (!rarity) return 'Common';
    return rarity.charAt(0).toUpperCase() + rarity.slice(1).toLowerCase();
  }
}
