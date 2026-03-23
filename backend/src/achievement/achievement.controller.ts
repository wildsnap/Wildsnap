import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';

@Controller('achievement')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Post()
  create(@Body() createAchievementDto: CreateAchievementDto) {
    return this.achievementService.create(createAchievementDto);
  }

  @Get()
  findAll() {
    return this.achievementService.findAll();
  }

  @Get('user/:userId')
  getUserAchievements(@Param('userId', ParseIntPipe) userId: number) {
    return this.achievementService.getUserAchievements(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.achievementService.findOne(id);
  }

  @Post('progress')
  async trackProgress(
    @Body('userId', ParseIntPipe) userId: number,
    @Body('criteriaType') criteriaType: string,
    @Body('amount') amount?: number, // Make it optional, defaults to 1
  ) {
    const increment = amount || 1;
    const unlocked = await this.achievementService.updateProgress(
      userId,
      criteriaType,
      increment,
    );

    return {
      success: true,
      message: 'Progress updated',
      unlockedAchievements: unlocked, // Returns [] if none were unlocked, or the achievement objects if they leveled up
    };
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.achievementService.remove(id);
  }
}
