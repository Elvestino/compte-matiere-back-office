import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SortieService } from '../service/sortie.service';
import { CreateSortieDto } from '../dto/create-sortie.dto';
import { Sortie } from '../entities/sortie.entity';

@Controller('sortie')
export class SortieController {
  constructor(private readonly sortieService: SortieService) {}

  @Post()
  create(@Body() createSortieDto: CreateSortieDto): Promise<Sortie> {
    return this.sortieService.create(createSortieDto);
  }

  @Get()
  findAll() {
    return this.sortieService.findAll();
  }

  @Get(':numSortie')
  findOne(@Param('numSortie') numSortie: string): Promise<Sortie> {
    return this.sortieService.findOne(numSortie);
  }

  @Delete(':numSortie')
  remove(@Param('numSortie') numSortie: string) {
    return this.sortieService.remove(numSortie);
  }
}
