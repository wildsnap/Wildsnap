import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { SupabaseService } from './supabase.service';

@Module({
  controllers: [AiController],
  providers: [AiService, SupabaseService],
})

export class AiModule {}
