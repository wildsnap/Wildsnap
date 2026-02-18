import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AuthGuardService } from 'src/auth-guard/auth-guard.service';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
