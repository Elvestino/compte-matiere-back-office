import { IsDate, IsNumber } from 'class-validator';

export class CreateOrdreDto {
  @IsNumber()
  numOrdre: number;

  @IsDate()
  dateOrdre: Date;

  @IsNumber()
  numService: number;

  @IsNumber()
  newannee: number;
}
