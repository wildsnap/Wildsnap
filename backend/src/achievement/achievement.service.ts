import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { PrismaService } from '../prisma/prisma.service'; // Adjust this path to your PrismaService
import { Achievement } from 'generated/prisma/client';

@Injectable()
export class AchievementService {
  // Inject your Prisma service here
  constructor(private prisma: PrismaService) {}

  async create(createAchievementDto: CreateAchievementDto) {
    return this.prisma.achievement.create({
      data: createAchievementDto,
    });
  }

  async findAll() {
    return this.prisma.achievement.findMany();
  }

  async findOne(id: number) {
    const achievement = await this.prisma.achievement.findUnique({
      where: { id },
    });

    if (!achievement) {
      throw new NotFoundException(`Achievement with ID #${id} not found`);
    }

    return achievement;
  }

  async updateProgress(userId: number, criteriaType: string, incrementAmount: number = 1) {
    // 1. Find all achievements that care about this specific action
    const relevantAchievements = await this.prisma.achievement.findMany({
      where: { criteriaType },
    });

    if (relevantAchievements.length === 0) return [];

    const newlyUnlockedAchievements: Achievement[] = [];

    // 2. Process each relevant achievement
    for (const achievement of relevantAchievements) {
      // Find the user's current progress for this specific achievement
      let userAchievement = await this.prisma.userAchievement.findFirst({
        where: { userId: userId, achievementId: achievement.id },
      });

      // If they don't have a tracking record yet, create one starting at 0
      if (!userAchievement) {
        userAchievement = await this.prisma.userAchievement.create({
          data: {
            userId: userId,
            achievementId: achievement.id,
            currentProgress: 0,
          },
        });
      }

      // If they already finished this one, skip it
      if (userAchievement.isCompleted) {
        continue;
      }

      // 3. Calculate new progress (cap it at the target value)
      const newProgress = Math.min(
        userAchievement.currentProgress + incrementAmount,
        achievement.targetValue,
      );
      const isNowCompleted = newProgress >= achievement.targetValue;

      // Prepare the update payload
      const updateData: any = { currentProgress: newProgress };
      if (isNowCompleted) {
        updateData.isCompleted = true;
        updateData.completedAt = new Date();
      }

      // 4. Save the new progress to the database
      await this.prisma.userAchievement.update({
        where: { id: userAchievement.id },
        data: updateData,
      });

      // 5. If they just completed it, reward them!
      if (isNowCompleted) {
        await this.prisma.user.update({
          where: { id: userId },
          data: {
            currentPoints: { increment: achievement.rewardPoints },
            totalPointsEarned: { increment: achievement.rewardPoints },
          },
        });
        
        // Add to our list so the frontend knows what to show in the "Achievement Unlocked!" toast
        newlyUnlockedAchievements.push(achievement);
      }
    }

    return newlyUnlockedAchievements;
  }

  async remove(id: number) {
    // Ensure the achievement exists before trying to delete
    await this.findOne(id); 

    return this.prisma.achievement.delete({
      where: { id },
    });
  }

  async getUserAchievements(userId: number) {
    // Optional: Verify the user exists first
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID #${userId} not found`);
    }

    // Fetch the user's achievements and include the achievement details
    return this.prisma.userAchievement.findMany({
      where: { 
        userId: userId 
      },
      include: {
        achievement: true, // This populates the related 'Achievement' data
      },
      orderBy: {
        isCompleted: 'desc', // Optional: Sort so completed ones show up first
      }
    });
  }
}