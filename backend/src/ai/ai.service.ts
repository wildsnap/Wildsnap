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
      // Send image to AI Model Service
      const aiData = await this.fetchAiPrediction(file);
      const normalizedName = aiData.class_name.replace(/_/g, ' ');

      // Discovery animal in DB
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

      let unlockedAchievements :Achievement[] = [];

      if (animal) {
        const user = await this.prisma.user.findUnique({ where: { clerkId } });
        
        if (user) {
          // 1. Trigger generic "Scan" achievement progress
          const scanAchievements = await this.achievementService.updateProgress(user.id, 'SCAN_ANIMAL', 1);
          unlockedAchievements.push(...scanAchievements);

          if (isFirstDiscovery) {
            // 2. Trigger "New Discovery" achievement progress
            const discoveryAchievements = await this.achievementService.updateProgress(user.id, 'NEW_DISCOVERY', 1);
            unlockedAchievements.push(...discoveryAchievements);

            // 3. Trigger specific quest (Mission) progress
            await this.questService.handleActionTrigger(user.id, 'SCAN_ANIMAL' as MissionType, animal.id);
          }
        }
      }

      if (!animal) {
        this.logger.warn(
          `Animal '${normalizedName}' found by AI but missing in DB.`,
        );
        return this.formatUnknownResponse(normalizedName, aiData.confidence);
      }

      const response = this.formatSuccessResponse(
        animal,
        aiData.confidence,
        isFirstDiscovery,
      );

      // Return the standard response PLUS any newly unlocked achievements
      return { ...response, unlockedAchievements };

    } catch (error) {
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