import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuardService } from '../auth-guard/auth-guard.service';

@Controller('users')
export class UsersController {
  @UseGuards(AuthGuardService)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
