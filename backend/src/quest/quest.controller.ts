import { Controller, Get, Param, Patch, Body, Query } from '@nestjs/common';
import { QuestService } from './quest.service';

@Controller('quests')
export class QuestController {
  constructor(private readonly questService: QuestService) {}

  // GET /quests - Lists all global missions
  @Get()
  findAll() {
    return this.questService.findAll();
  }

  // GET /quests/user/123 - Lists missions specifically for user 123
  @Get('user/:userId')
  getUserQuests(@Param('userId') userId: string) {
    return this.questService.getUserMissions(+userId);
  }

  // GET /quests/1 - Details of one specific mission
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questService.findOne(+id);
  }

  // PATCH /quests/progress - Update progress (e.g., called after a successful scan)
  @Patch('progress')
  async updateProgress(
    @Body('userId') userId: number,
    @Body('missionId') missionId: number,
    @Body('increment') increment: number,
  ) {
    return this.questService.updateProgress(userId, missionId, increment);
  }
}