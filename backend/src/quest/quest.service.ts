import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MissionType } from 'generated/prisma/enums';

@Injectable()
export class QuestService {
  constructor(private prisma: PrismaService) {}

  // Get all missions available in the game
  async findAll() {
    return this.prisma.mission.findMany({
      include: {
        animal: { select: { name: true, imageUrl: true, rarityLevel: true } },
        story: { select: { title: true } },
      },
    });
  }

  async findOne(id: number) {
    if (!id || isNaN(id)) {
      throw new BadRequestException(`Invalid mission ID provided`);
    }
  
    const mission = await this.prisma.mission.findUnique({
      where: { id },
      include: { animal: true, story: true },
    });
    
    if (!mission) throw new NotFoundException(`Mission #${id} not found`);
    return mission;
  }

  // Get progress for a specific user
  async getUserMissions(userId: number) {
    return this.prisma.userMission.findMany({
      where: { userId },
      include: {
        mission: true,
      },
    });
  }

  async updateProgress(
    userId: number,
    missionId: number,
    progressIncrement: number,
  ) {
    // 1. Find the User's Mission progress
    const userMission = await this.prisma.userMission.findFirst({
      where: { userId, missionId },
      include: { mission: true, user: true },
    });

    if (!userMission)
      throw new NotFoundException('Mission not assigned to user');
    if (userMission.isCompleted)
      throw new BadRequestException('Mission already completed');

    const newProgress = userMission.currentProgress + progressIncrement;
    const isNowCompleted = newProgress >= userMission.mission.targetValue;

    // 2. Use a Transaction to update both tables safely
    return this.prisma.$transaction(async (tx) => {
      // Update Mission Progress
      const updatedUserMission = await tx.userMission.update({
        where: { id: userMission.id },
        data: {
          currentProgress: newProgress,
          isCompleted: isNowCompleted,
          completedAt: isNowCompleted ? new Date() : null,
        },
      });

      // 3. If completed, award the points!
      if (isNowCompleted) {
        const reward = userMission.mission.rewardPoints;

        await tx.user.update({
          where: { id: userId },
          data: {
            currentPoints: { increment: reward },
            totalPointsEarned: { increment: reward },
          },
        });

        return {
          ...updatedUserMission,
          message: `Mission Complete! You earned ${reward} points.`,
        };
      }

      return updatedUserMission;
    });
  }

  async handleActionTrigger(
    userId: number,
    type: MissionType,
    relatedId: number,
  ) {
    // 1. Find all active missions for this action
    const potentialMissions = await this.prisma.mission.findMany({
      where: {
        missionType: type,
        // Logic for animal or story specific triggers
        OR: [{ animalId: relatedId }, { storyId: relatedId }],
      },
    });

    for (const mission of potentialMissions) {
      await this.prisma.$transaction(async (tx) => {
        // 2. Update or Create the user's progress
        const userMission = await tx.userMission.upsert({
          where: {
            userId_missionId: { userId, missionId: mission.id },
          },
          update: {
            // We only increment if it's not already completed
            currentProgress: {
              increment: 1,
            },
          },
          create: {
            userId,
            missionId: mission.id,
            currentProgress: 1,
          },
          include: { mission: true },
        });

        // 3. Check if mission just finished (and wasn't already finished)
        // Logic: If currentProgress reached targetValue AND it wasn't marked completed yet
        if (
          !userMission.isCompleted &&
          userMission.currentProgress >= mission.targetValue
        ) {
          // 4. Mark as completed
          await tx.userMission.update({
            where: { id: userMission.id },
            data: {
              isCompleted: true,
              completedAt: new Date(),
            },
          });

          // 5. Award the user points
          await tx.user.update({
            where: { id: userId },
            data: {
              currentPoints: { increment: mission.rewardPoints },
              totalPointsEarned: { increment: mission.rewardPoints },
            },
          });

          console.log(
            `User ${userId} completed mission ${mission.id} and earned ${mission.rewardPoints} points!`,
          );
        }
      });
    }
  }

  async getNextGuidedMission(userId: number) {
    const questSequence = [1, 2, 3, 4];
    console.log("dkamdkaamldmlkm")
    // 1. Get all completed progress for THIS user
    const completedMissions = await this.prisma.userMission.findMany({
      where: {
        userId,
        missionId: { in: questSequence },
        isCompleted: true,
      },
      select: { missionId: true },
    });

    const completedIds = completedMissions.map((m) => m.missionId);

    // 2. Find the first ID in the sequence the user hasn't finished
    const nextMissionId = questSequence.find(
      (id) => !completedIds.includes(id),
    );

    if (!nextMissionId) {
      return { message: 'All guided missions complete!', isFinished: true };
    }

    // 3. UPSERT: This creates the "link" between the User and the Mission Template
    return this.prisma.userMission.upsert({
      where: {
        userId_missionId: {
          userId,
          missionId: nextMissionId,
        },
      },
      update: {}, // Don't change anything if it exists
      create: {
        userId,
        missionId: nextMissionId,
        currentProgress: 0,
      },
      include: {
        mission: {
          include: { animal: true },
        },
      },
    });
  }
}
