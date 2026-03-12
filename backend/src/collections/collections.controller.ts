import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger'; // 👈 เพิ่ม Import ของ Swagger
import { CollectionsService } from './collections.service';

@ApiTags('collections') // จัดหมวดหมู่ใน Swagger ให้สวยงาม
@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get('user/:clerkId')
  @ApiParam({ 
    name: 'clerkId', 
    type: 'string', 
    description: 'The Clerk User ID (String)' 
  }) // 👈 บังคับบอก Swagger ว่าช่องนี้เป็น String!
  async getCollection(@Param('clerkId') clerkId: string) {
    return this.collectionsService.getUserCollection(clerkId);
  }
}