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
      // 1. Fetch item and user in parallel to save time (optional but faster)
      const [item, user] = await Promise.all([
        tx.item.findUnique({ where: { id: itemId } }),
        tx.user.findUnique({ where: { clerkId } }),
      ]);

      if (!item) throw new NotFoundException('Item not found');
      if (!user) throw new NotFoundException('User not found');

      // 2. NEW: Check if user already owns this item
      const existingRecord = await tx.userInventory.findFirst({
        where: {
          userId: user.id,
          itemId: itemId,
        },
      });

      if (existingRecord) {
        throw new BadRequestException('You already own this item');
      }

      // 3. Check points
      if (user.currentPoints < item.price) {
        throw new BadRequestException('Insufficient points');
      }

      // 4. Deduct points
      const updatedUser = await tx.user.update({
        where: { clerkId },
        data: { currentPoints: { decrement: item.price } },
      });

      // 5. Create inventory record
      const inventory = await tx.userInventory.create({
        data: {
          user: { connect: { clerkId } },
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

  async findOwnItems(userId: number, type?: ItemType) {
    return this.prisma.userInventory.findMany({
      where: {
        userId: userId,
        item: type ? { type: type } : {},
      },
      include: {
        item: true,
      },
      orderBy: {
        purchasedAt: 'desc',
      },
    });
  }
}
