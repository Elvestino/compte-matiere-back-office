import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateFactureDto {
  @IsDate()
  dateFacture: Date;
  @IsString()
  destination: string;
  @IsString()
  objetFacture: string;
  @IsString()
  LieuFacture: string;
  @IsNumber()
  montantFacture: number;
  @IsString()
  typeFacture: string;

  @IsString()
  nomFrns: string;
}
