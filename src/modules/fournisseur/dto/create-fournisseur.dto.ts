import { IsNotEmpty } from 'class-validator';

export class CreateFournisseurDto {
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
