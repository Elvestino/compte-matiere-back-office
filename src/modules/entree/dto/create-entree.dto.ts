import { IsNumber, IsString } from 'class-validator';

export class CreateEntreeDto {
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
