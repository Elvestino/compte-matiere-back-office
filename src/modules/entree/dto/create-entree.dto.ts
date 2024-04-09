import { IsNumber, IsString } from 'class-validator';

export class CreateEntreeDto {
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
  @IsString()
  destination: string;
}
