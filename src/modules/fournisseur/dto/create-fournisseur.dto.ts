import { IsNotEmpty } from 'class-validator';

export class CreateFournisseurDto {
  @IsNotEmpty()
  numFrns: number;

  @IsNotEmpty()
  nomFrns: string;

  @IsNotEmpty()
  prenomFrns: string;

  @IsNotEmpty()
  adrsFrns: string;

  @IsNotEmpty()
  telFrns: string;

  @IsNotEmpty()
  typeFrns: string;
}
