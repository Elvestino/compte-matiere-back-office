import { PartialType } from '@nestjs/mapped-types';
import { CreateEntreeDto } from './create-entree.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateEntreeDto extends PartialType(CreateEntreeDto) {
  @IsNumber()
  numEntree: number;
  @IsString()
  numFolioGL: number;
  @IsString()
  nomenclature: number;
  @IsString()
  designation: string;
  @IsString()
  especeUnitaire: string;
  @IsNumber()
  quantite: number;
  @IsNumber()
  prix: number;

  @IsNumber()
  newannee: number;
  @IsNumber()
  numFacture: number;
}
