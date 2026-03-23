import {
  Controller,
  Get,
  Patch,
  Body,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import { UpdateSettingsDto } from './update-settings.dto';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async getSettings(@Headers('x-user-id') clerkId: string) {
    if (!clerkId) throw new BadRequestException('Missing x-user-id');
    return this.settingsService.getSettings(clerkId);
  }

  @Patch()
  async updateSettings(
    @Headers('x-user-id') clerkId: string,
    @Body() dto: UpdateSettingsDto,
  ) {
    if (!clerkId) throw new BadRequestException('Missing x-user-id');
    return this.settingsService.updateSettings(clerkId, dto);
  }
}
