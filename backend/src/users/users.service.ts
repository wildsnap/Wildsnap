// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOneByClerkId(clerkId: string) {
    // 1. Find the basic user first to get their internal integer ID
    const user = await this.prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      throw new NotFoundException(`User with Clerk ID ${clerkId} not found`);
    }

    // 2. Call our new upsert function to ensure all achievements are initialized
    await this.syncUserAchievements(user.id);

    // 3. Now that we know all achievements exist, fetch and return the user 
    // with their settings and their fully updated achievements list!
    return this.prisma.user.findUnique({
      where: { clerkId },
      include: { 
        settings: true, 
        achievements: {
          include: {
            achievement: true // This includes the master achievement info (name, description, etc.)
          }
        } 
      }
    });
  }

  private async syncUserAchievements(userId: number) {
    // 1. Get all the master achievements that exist in the game
    const allAchievements = await this.prisma.achievement.findMany();

    // 2. Map through them and run an upsert for each one simultaneously
    // Promise.all makes this run in parallel so it's super fast!
    await Promise.all(
      allAchievements.map((achievement) =>
        this.prisma.userAchievement.upsert({
          where: {
            // NOTE: This requires @@unique([userId, achievementId]) in your schema!
            userId_achievementId: {
              userId: userId,
              achievementId: achievement.id,
            },
          },
          update: {}, // If they already have it, do absolutely nothing
          create: {
            // If they don't have it, create it starting at 0 progress
            userId: userId,
            achievementId: achievement.id,
            currentProgress: 0,
            isCompleted: false,
          },
        })
      )
    );
  }

  async createOrUpdateFromClerk(data: {
    clerkId: string;
    email: string;
    username: string;
  }) {
    // IMPORTANT: Check your database and replace these numbers 
    // with the actual Item IDs of your starting gear!
    const defaultHeadId = 6; 
    const defaultBodyId = 10;
    const defaultLegId = 14;

    return this.prisma.user.upsert({
      where: { clerkId: data.clerkId },
      update: {
        email: data.email,
        username: data.username,
      },
      create: {
        clerkId: data.clerkId,
        email: data.email,
        username: data.username,
        currentPoints: 0,
        totalPointsEarned: 0,
        // This automatically creates and equips the starter items 
        // the moment the user row is created in the database.
        inventory: {
          create: [
            { itemId: defaultHeadId, isEquipped: true },
            { itemId: defaultBodyId, isEquipped: true },
            { itemId: defaultLegId, isEquipped: true },
          ]
        }
      },
    });
  }

  async deleteUser(clerkId: string) {
    return await this.prisma.user.delete({
      where: { clerkId },
    });
  }

  async findUserById(userid: number) {
    return await this.prisma.user.findUnique({
      where: { id: userid },
    });
  }
}
