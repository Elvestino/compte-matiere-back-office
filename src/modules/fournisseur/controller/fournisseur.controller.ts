import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FournisseurService } from '../services/fournisseur.service';
import { CreateFournisseurDto } from '../dto/create-fournisseur.dto';
import { Fournisseur } from '../entities/fournisseur.entity';
import { UpdateFournisseurDto } from '../dto/update-fournisseur.dto';

@Controller('fournisseur')
export class FournisseurController {
  constructor(private readonly fournisseurService: FournisseurService) {}

  @Post()
  async create(
    @Body() createFournisseurDto: CreateFournisseurDto,
  ): Promise<Fournisseur> {
    return await this.fournisseurService.create(createFournisseurDto);
  }

  @Get()
  findAll() {
    return this.fournisseurService.findAll();
  }

  @Get(':numFrns')
  findOne(@Param('numFrns') numFrns: number) {
    return this.fournisseurService.findOne(numFrns);
  }

  @Patch(':numFrns')
  update(
    @Param('numFrns') numFrns: number,
    @Body() updateFournisseurDto: UpdateFournisseurDto,
  ) {
    return this.fournisseurService.update(numFrns, updateFournisseurDto);
  }

  @Delete(':numFrns')
  remove(@Param('numFrns') numFrns: number) {
    return this.fournisseurService.remove(numFrns);
  }
}
