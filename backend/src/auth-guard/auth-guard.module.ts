import { Module, Global } from '@nestjs/common';
import { AuthGuardService } from './auth-guard.service';
import { ClerkClientProvider } from '../providers/clerk.provider';
import { UsersModule } from 'src/users/users.module';

@Global()
@Module({
  imports: [UsersModule],
  providers: [
    AuthGuardService,
    ClerkClientProvider
  ],
  exports: ['ClerkClient', AuthGuardService],
})
export class AuthGuardModule {}