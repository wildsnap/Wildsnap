import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PurchaseItemDto } from './dto/purchaseData.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { ItemType } from '../../generated/prisma/client';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.item.findMany();
  }

  findOne(id: number) {
    return this.prisma.item.findUnique({ where: { id } });
  }

  findItemByCategory(category: ItemType) {
    return this.prisma.item.findMany({
      where: {
        type: category,
      },
    });
  }

  async purchase(dto: PurchaseItemDto) {
    const { clerkId, itemId } = dto;

    return this.prisma.$transaction(async (tx) => {
      // 1. Check if item exists
      const item = await tx.item.findUnique({ where: { id: itemId } });
      if (!item) throw new NotFoundException('Item not found');

      // 2. Check user
      const user = await tx.user.findUnique({ where: { clerkId: clerkId } });
      if (!user || user.currentPoints < item.price) {
        throw new BadRequestException('Insufficient points');
      }

      // 3. Deduct points and GET the updated user
      const updatedUser = await tx.user.update({
        where: { clerkId: clerkId },
        data: { currentPoints: { decrement: item.price } },
      });

      // 4. Create inventory record
      const inventory = await tx.userInventory.create({
        data: {
          user: { connect: { clerkId: clerkId } },
          item: { connect: { id: itemId } },
        },
        include: { item: true },
      });

      return {
        inventory,
        remainingPoints: updatedUser.currentPoints,
      };
    });
  }
}
