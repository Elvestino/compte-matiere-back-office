import { Controller, Post, Body, Param, Delete, Get } from '@nestjs/common';
import { AnneeService } from '../service/annee.service';
import { CreateAnneeDto } from '../dto/create-annee.dto';

@Controller('annee')
export class AnneeController {
  constructor(private readonly anneeService: AnneeService) {}

  @Post()
  create(@Body() createAnneeDto: CreateAnneeDto) {
    return this.anneeService.create(createAnneeDto);
  }
  @Get()
  findAll() {
    return this.anneeService.findAll();
  }

  @Delete(':annee')
  remove(@Param('annee') annee: number) {
    return this.anneeService.remove(annee);
  }
}
