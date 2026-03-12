import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnimalsService } from './animals.service';

@ApiTags('animals')
@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  // GET: http://localhost:3100/animals
  @Get()
  async getAllAnimals() {
    return this.animalsService.getAllAnimals();
  }

  // GET: http://localhost:3100/animals/1
  @Get(':id')
  async getAnimalById(@Param('id', ParseIntPipe) id: number) {
    return this.animalsService.getAnimalById(id);
  }
}