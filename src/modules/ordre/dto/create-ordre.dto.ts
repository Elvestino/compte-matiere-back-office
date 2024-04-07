import { IsDate, IsNumber } from 'class-validator';

export class CreateOrdreDto {
  @IsDate()
  dateOrdre: Date;

  @IsNumber()
  numService: string;

  @IsNumber()
  newannee: number;
}
