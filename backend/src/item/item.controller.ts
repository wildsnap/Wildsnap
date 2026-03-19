import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
  ParseEnumPipe,
  Request,
  Logger
} from '@nestjs/common';
import { ItemService } from './item.service';
import { PurchaseItemDto } from './dto/purchaseData.dto';
import { ItemType } from '../../generated/prisma/client';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('purchase')
  async purchase(@Body() dto: PurchaseItemDto) {
    return await this.itemService.purchase(dto);
  }

  @Get('filter/:category')
  async getItemsByCategory(
    @Param('category', new ParseEnumPipe(ItemType)) category: ItemType,
  ) {
    return this.itemService.findItemByCategory(category);
  }

  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
  }

  @Get('my-items/:category')
  async getMyItems(
    @Request() req,
    @Param('category', new ParseEnumPipe(ItemType)) category: ItemType,
  ) {
    // If req.user is undefined, this next line will crash the route
    const userId = req.user?.id; 
    
    return this.itemService.findOwnItems(userId, category);
  }
}
