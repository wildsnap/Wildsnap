import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import FormData from 'form-data';
import { PrismaService } from '../prisma/prisma.service';
import { SupabaseService } from './supabase.service';

const CONFIDENCE_THRESHOLD = 85;

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly AI_URL =
    process.env.GOOGLE_CLOUD_AI_URL || 'http://localhost:8000/predict';

  constructor(
    private prisma: PrismaService,
    private supabaseService: SupabaseService,
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

      if (!animal) {
        this.logger.warn(
          `Animal '${normalizedName}' found by AI but missing in DB.`,
        );
        return this.formatUnknownResponse(normalizedName, aiData.confidence);
      }

      return this.formatSuccessResponse(
        animal,
        aiData.confidence,
        isFirstDiscovery,
      );
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

  // ScanLog & Collection
  private async processUserScan(
    clerkId: string,
    animal: any,
    confidence: number,
    imageUrl: string | null,
  ): Promise<boolean> {
    if (!clerkId) return false;

    const user = await this.prisma.user.findUnique({ where: { clerkId } });
    if (!user) return false;

    // Save into ScanLog
    await this.prisma.scanLog.create({
      data: {
        userId: user.id,
        status: animal ? 'SUCCESS' : 'UNKNOWN_ANIMAL',
        predictedAnimalId: animal ? animal.id : null,
        confidenceScore: confidence,
        imageUrl: imageUrl,
      },
    });

    // If animal is found and confidence is above threshold, add to collection and reward points
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
        return true; // First discovery
      }
    }
    return false; // Everfound or Unknown animal
  }

  // จัดรูปแบบข้อมูลตอบกลับ (เจอสัตว์ใน DB)
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

  // จัดรูปแบบข้อมูลตอบกลับ (ไม่เจอสัตว์ใน DB)
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
