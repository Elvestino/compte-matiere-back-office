import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateFactureDto {
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
