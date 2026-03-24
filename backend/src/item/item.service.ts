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

  async findOwnItems(clerkId: string, type?: ItemType) {
    return this.prisma.userInventory.findMany({
      where: {
        user: {
          clerkId: clerkId,
        },
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

  async toggleEquip(clerkId: string, inventoryId: number | string) {
    // 1. Force the URL param into a Number to prevent Prisma validation errors
    const parsedInvId = Number(inventoryId);
  
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { clerkId } });
      if (!user) throw new NotFoundException('User not found');
  
      // 2. Use parsedInvId for all Prisma queries
      const targetInventory = await tx.userInventory.findFirst({
        where: { id: parsedInvId, userId: user.id },
        include: { item: true },
      });
  
      if (!targetInventory) {
        throw new NotFoundException('Item not found in your inventory');
      }
  
      const isCurrentlyEquipped = targetInventory.isEquipped;
      const itemType = targetInventory.item.type;
  
      if (!isCurrentlyEquipped) {
        const currentlyEquipped = await tx.userInventory.findMany({
          where: {
            userId: user.id,
            isEquipped: true,
            item: { type: itemType }, 
          },
        });
  
        for (const equipped of currentlyEquipped) {
          await tx.userInventory.update({
            where: { id: equipped.id },
            data: { isEquipped: false },
          });
        }
      }
  
      // 3. Make sure to use parsedInvId here as well
      const updatedInventory = await tx.userInventory.update({
        where: { id: parsedInvId },
        data: { isEquipped: !isCurrentlyEquipped },
        include: { item: true },
      });
  
      return { success: true, inventory: updatedInventory };
    });
  }
}
