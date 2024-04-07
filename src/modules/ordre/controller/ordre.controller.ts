import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { OrdreService } from '../service/ordre.service';
import { CreateOrdreDto } from '../dto/create-ordre.dto';
import { Ordre } from '../entities/ordre.entity';
import { UpdateOrdreDto } from '../dto/update-ordre.dto';

@Controller('ordre')
export class OrdreController {
  constructor(private readonly ordreService: OrdreService) {}

  @Post()
  create(@Body() createOrdreDto: CreateOrdreDto): Promise<Ordre> {
    console.log(createOrdreDto);
    return this.ordreService.create(createOrdreDto);
  }

  @Get()
  findAll() {
    return this.ordreService.findAll();
  }

  @Get(':numOrdre')
  findOne(@Param('numOrdre') numOrdre: string): Promise<Ordre> {
    return this.ordreService.findOne(numOrdre);
  }

  @Patch(':numOrdre')
  update(@Body() updateOrdreDto: UpdateOrdreDto) {
    return this.ordreService.update(updateOrdreDto);
  }

  @Delete(':numOrdre')
  remove(@Param('numOrdre') numOrdre: string) {
    return this.ordreService.delete(numOrdre);
  }
}
