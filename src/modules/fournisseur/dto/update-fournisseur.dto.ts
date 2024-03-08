import { PartialType } from '@nestjs/mapped-types';
import { CreateFournisseurDto } from './create-fournisseur.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateFournisseurDto extends PartialType(CreateFournisseurDto) {
  @IsNotEmpty()
  numFrns: number;

  @IsNotEmpty()
  @IsString()
  nomFrns: string;

  @IsNotEmpty()
  @IsString()
  prenomFrns: string;

  @IsNotEmpty()
  @IsString()
  adrsFrns: string;

  @IsNotEmpty()
  @IsString()
  telFrns: string;

  @IsNotEmpty()
  @IsString()
  typeFrns: string;
}
