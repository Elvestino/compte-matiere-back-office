import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FactureService } from '../service/facture.service';
import { CreateFactureDto } from '../dto/create-facture.dto';
import { UpdateFactureDto } from '../dto/update-facture.dto';
import { Facture } from '../entities/facture.entity';

@Controller('facture')
export class FactureController {
  constructor(private readonly factureService: FactureService) {}

  @Post()
  create(@Body() createFactureDto: CreateFactureDto): Promise<Facture> {
    return this.factureService.create(createFactureDto);
  }

  @Get()
  findAll() {
    return this.factureService.findAll();
  }

  @Get(':numFacture')
  findOne(@Param('numFacture') numFacture: number) {
    return this.factureService.findOne(numFacture);
  }

  @Patch(':numFacture')
  update(
    @Param('numFacture') numFacture: number,
    @Body() updateFactureDto: UpdateFactureDto,
  ) {
    return this.factureService.update(numFacture, updateFactureDto);
  }

  @Delete(':numFacture')
  remove(@Param('numFacture') numFacture: number) {
    return this.factureService.delete(numFacture);
  }
}
