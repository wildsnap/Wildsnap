import { Module } from '@nestjs/common';
import { QuestService } from './quest.service';
import { QuestController } from './quest.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [QuestController],
  providers: [QuestService],
  exports: [QuestService]
})
export class QuestModule {}
