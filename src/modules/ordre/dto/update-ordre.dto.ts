import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdreDto } from './create-ordre.dto';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class UpdateOrdreDto extends PartialType(CreateOrdreDto) {
  @IsString()
  numOrdre: string;

  @IsDate()
  dateOrdre: Date;

  @IsNumber()
  numService: string;

  @IsNumber()
  newannee: number;
}
