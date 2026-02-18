import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { verifyToken } from '@clerk/backend';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const sessionToken = request.cookies?.__session;
    const authHeader = request.headers.authorization;
    const bearerToken = authHeader?.startsWith('Bearer ')
      ? authHeader.substring(7)
      : null;

    if (!sessionToken && !bearerToken) {
      throw new UnauthorizedException('No authentication token provided');
    }

    try {
      const tokenToVerify = bearerToken || sessionToken;
      
      const tokenPayload = await verifyToken(tokenToVerify, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });

      if (!tokenPayload) {
        throw new UnauthorizedException('Invalid session');
      }

      const user = await this.usersService.findOneByClerkId(tokenPayload.sub);

      if (!user) {
        throw new UnauthorizedException('User record not found in local database');
      }

      (request as any).user = user;
      
      return true;
    } catch (err) {
      console.error('AuthGuard Error:', err.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}