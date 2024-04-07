import { PartialType } from '@nestjs/mapped-types';
import { CreateFactureDto } from './create-facture.dto';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class UpdateFactureDto extends PartialType(CreateFactureDto) {
  @IsString()
  numFacture: string;
  @IsDate()
  dateFacture: Date;
  @IsString()
  destination: string;
  @IsString()
  ojbetFacture: string;
  @IsString()
  LieuFacture: string;
  @IsNumber()
  montantFacture: number;
  @IsString()
  typeFacture: string;

  @IsString()
  nomFrns: string;
}
