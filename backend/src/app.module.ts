import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthGuardModule } from './auth-guard/auth-guard.module';
import { ClerkModule } from './providers/clerk.module';
import { ConfigModule } from '@nestjs/config';
import { AiModule } from './ai/ai.module';
import { PrismaModule } from './prisma/prisma.module';
import { CollectionsModule } from './collections/collections.module';
import { AnimalsModule } from './animals/animals.module';
import { ItemModule } from './item/item.module';
import { QuestModule } from './quest/quest.module';
import { AchievementModule } from './achievement/achievement.module';

@Module({
  imports: [
    UsersModule,
    AiModule,
    CollectionsModule,
    AnimalsModule,
    AuthGuardModule,
    ClerkModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ItemModule,
    QuestModule,
    AchievementModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
