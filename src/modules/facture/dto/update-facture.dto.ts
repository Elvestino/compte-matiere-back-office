import { PartialType } from '@nestjs/mapped-types';
import { CreateFactureDto } from './create-facture.dto';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class UpdateFactureDto extends PartialType(CreateFactureDto) {
  @IsNumber()
  numFacture: number;
  @IsDate()
  dateFacture: Date;
  @IsString()
  destination: string;
  @IsString()
  ojbetFacture: string;
  @IsString()
  LieuFacture: string;
  @IsString()
  montantFacture: string;
  @IsString()
  typeFacture: string;

  @IsNumber()
  numFrns: number;

  @IsNumber()
  numOrdre: number;
}
