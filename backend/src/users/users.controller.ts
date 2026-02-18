import { AuthGuardService } from '../auth-guard/auth-guard.service';
import {
  Controller,
  Post,
  Req,
  Res,
  Headers,
  BadRequestException,
  UseGuards,
  Get,
} from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import type { Request } from 'express';
import { Webhook } from 'svix';
import { UsersService } from '../users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('profile')
  getProfile() {
    return this.userService.findUserById(1);
  }

  @Post('webhooks/clerk')
  async handleClerkWebhook(
    @Headers('svix-id') id: string,
    @Headers('svix-timestamp') timestamp: string,
    @Headers('svix-signature') signature: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    if (!req.rawBody) {
      throw new BadRequestException('Missing raw request body');
    }

    const payload = req.rawBody.toString();
    const secret = process.env.CLERK_WEBHOOK_SECRET;

    if (!secret) {
      throw new Error('CLERK_WEBHOOK_SECRET is not set');
    }

    const wh = new Webhook(secret);
    let evt: any;

    try {
      evt = wh.verify(payload, {
        'svix-id': id,
        'svix-timestamp': timestamp,
        'svix-signature': signature,
      });
    } catch (err) {
      console.error('Webhook Error:', err.message);
      throw new BadRequestException('Webhook verification failed');
    }

    const eventType = evt.type;
    const {
      id: clerkId,
      email_addresses,
      username,
      first_name,
      last_name,
    } = evt.data;

    // Mapping logic to match your Prisma Model
    const userEmail = email_addresses?.[0]?.email_address;

    // Clerk might not always provide a username. We provide a fallback.
    const userDisplayName = username || `${first_name}_${clerkId.slice(-4)}`;

    if (eventType === 'user.created' || eventType === 'user.updated') {
      await this.userService.createOrUpdateFromClerk({
        clerkId,
        email: userEmail,
        username: userDisplayName,
      });
    }

    if (eventType === 'user.deleted') {
      // It is good practice to handle deletions so you don't keep orphaned data
      await this.userService.deleteUser(clerkId);
    }

    return { received: true };
  }
}
