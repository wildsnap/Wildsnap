import { Module, Global } from '@nestjs/common';
import { ClerkClientProvider } from './clerk.provider';

@Global()
@Module({
  providers: [ClerkClientProvider],
  exports: [ClerkClientProvider],
})
export class ClerkModule {}