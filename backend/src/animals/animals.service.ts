import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnimalsService {
  constructor(private prisma: PrismaService) {}

  async getAllAnimals() {
    return this.prisma.animal.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async getAnimalById(id: number) {
    const animal = await this.prisma.animal.findUnique({
      where: { id: id },
    });

    if (!animal) {
      throw new NotFoundException(`Animal with ID ${id} not found`);
    }

    return animal;
  }
}
