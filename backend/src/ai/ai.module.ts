import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { SupabaseService } from './supabase.service';
import { AchievementModule } from 'src/achievement/achievement.module';
import { QuestModule } from 'src/quest/quest.module';

@Module({
  imports: [AchievementModule, QuestModule],
  controllers: [AiController],
  providers: [AiService, SupabaseService],
})

export class AiModule {}
