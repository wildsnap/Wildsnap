import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
      accelerateUrl: process.env.DATABASE_URL || '',
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
