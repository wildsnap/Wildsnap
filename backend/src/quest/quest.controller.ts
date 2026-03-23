import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  Query,
  Headers,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { QuestService } from './quest.service';
import { UsersService } from '../users/users.service';

@Controller('quests')
export class QuestController {
  constructor(private readonly questService: QuestService,
    private readonly usersService: UsersService
  ) {}

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

  
  // PATCH /quests/progress - Update progress (e.g., called after a successful scan)
  @Patch('progress')
  async updateProgress(
    @Body('userId') userId: number,
    @Body('missionId') missionId: number,
    @Body('increment') increment: number,
  ) {
    return this.questService.updateProgress(userId, missionId, increment);
  }
  
  @Get('guided')
  async getNextMission(
    @Headers('x-user-id') clerkId: string, 
  ) {
    const user = await this.usersService.findOneByClerkId(clerkId);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    return await this.questService.getNextGuidedMission(user.id);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    const missionId = parseInt(id, 10);
    if (isNaN(missionId)) {
      throw new BadRequestException(`Mission ID must be a number ${id}`);
    }
    return this.questService.findOne(missionId);
  }
}