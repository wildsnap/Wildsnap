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
}
