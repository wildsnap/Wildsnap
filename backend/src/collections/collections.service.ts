import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CollectionsService {
  constructor(private prisma: PrismaService) {}

  async getUserCollection(clerkId: string) {
    const user = await this.prisma.user.findUnique({
      where: { clerkId: clerkId },
    });

    if (!user) {
      throw new NotFoundException('User not found in database');
    }

    const allAnimals = await this.prisma.animal.findMany({
      include: {
        collectedBy: {
          where: {
            userId: user.id,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });

    const formattedCollection = allAnimals.map((animal) => {
      const isUnlocked = animal.collectedBy.length > 0;
      const collectionData = isUnlocked ? animal.collectedBy[0] : null;

      return {
        id: animal.id,
        name: isUnlocked ? animal.name : '???',
        scientificName: isUnlocked ? animal.scientificName : '???',
        description: isUnlocked
          ? animal.description
          : 'Explore the wild to unlock this animal!',
        habitat: isUnlocked ? animal.habitat : 'Unknown',
        rarityLevel: animal.rarityLevel,
        imageUrl: isUnlocked ? animal.imageUrl : animal.shadowImageUrl,
        isUnlocked: isUnlocked,
        capturedAt: collectionData?.capturedAt || null,
        customName: collectionData?.customName || null,
        isFirstDiscovery: collectionData?.isFirstDiscovery || false,
      };
    });

    const unlockedCount = formattedCollection.filter(
      (a) => a.isUnlocked,
    ).length;
    const totalCount = formattedCollection.length;
    const percentage =
      totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

    return {
      progress: {
        unlocked: unlockedCount,
        total: totalCount,
        percentage: percentage,
      },
      animals: formattedCollection,
    };
  }
}
