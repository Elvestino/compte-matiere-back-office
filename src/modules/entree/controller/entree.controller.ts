import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EntreeService } from '../service/entree.service';
import { CreateEntreeDto } from '../dto/create-entree.dto';
import { UpdateEntreeDto } from '../dto/update-entree.dto';
import { Entree } from '../entities/entree.entity';

@Controller('entree')
export class EntreeController {
  constructor(private readonly entreeService: EntreeService) {}

  @Post()
  create(@Body() createEntreeDto: CreateEntreeDto): Promise<Entree> {
    return this.entreeService.create(createEntreeDto);
  }

  @Get()
  findAll() {
    return this.entreeService.findAll();
  }

  @Get(':numEntree')
  findOne(@Param('numEntree') numEntree: number): Promise<Entree> {
    return this.entreeService.findOne(+numEntree);
  }

  @Patch(':numEntree')
  update(
    @Param('numEntree') numEntree: number,
    @Body() updateEntreeDto: UpdateEntreeDto,
  ) {
    return this.entreeService.update(+numEntree, updateEntreeDto);
  }

  @Delete(':numEntree')
  remove(@Param('numEntree') numEntree: number) {
    return this.entreeService.remove(+numEntree);
  }
}
