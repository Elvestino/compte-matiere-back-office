import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdreDto } from './create-ordre.dto';
import { IsDate, IsNumber } from 'class-validator';

export class UpdateOrdreDto extends PartialType(CreateOrdreDto) {
  @IsNumber()
  numOrdre: number;

  @IsDate()
  dateOrdre: Date;

  @IsNumber()
  numService: number;

  @IsNumber()
  newannee: number;
}
