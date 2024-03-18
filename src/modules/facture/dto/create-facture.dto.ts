import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateFactureDto {
  @IsNumber()
  numFacture: number;
  @IsDate()
  dateFacture: Date;
  @IsString()
  destination: string;
  @IsString()
  objetFacture: string;
  @IsString()
  LieuFacture: string;
  @IsString()
  montantFacture: number;
  @IsString()
  typeFacture: string;

  @IsNumber()
  numFrns: number;

  @IsNumber()
  numOrdre: number;
}
