import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OrdreService } from '../service/ordre.service';
import { CreateOrdreDto } from '../dto/create-ordre.dto';
//import { UpdateOrdreDto } from '../dto/update-ordre.dto';

@Controller('ordre')
export class OrdreController {
  constructor(private readonly ordreService: OrdreService) {}

  @Post()
  create(@Body() createOrdreDto: CreateOrdreDto) {
    return this.ordreService.create(createOrdreDto);
  }

  @Get()
  findAll() {
    return this.ordreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordreService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrdreDto: UpdateOrdreDto) {
  //   return this.ordreService.update(+id, updateOrdreDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordreService.remove(+id);
  }
}
