import { IsNumber } from 'class-validator';

export class CreateSortieDto {
  @IsNumber()
  numSortie: number;

  @IsNumber()
  numEntree: number;
}
