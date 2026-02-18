// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOneByClerkId(clerkId: string) {
    return this.prisma.user.findUnique({
      where: { clerkId },
    });
  }

  async createOrUpdateFromClerk(data: {
    clerkId: string;
    email: string;
    username: string;
  }) {
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
