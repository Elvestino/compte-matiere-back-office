import { PartialType } from '@nestjs/mapped-types';
import { CreateQuitusDto } from './create-quitus.dto';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateQuitusDto extends PartialType(CreateQuitusDto) {
  @IsNotEmpty()
  @IsString()
  numQuitus: string;

  @IsDate()
  dateQuitus: Date;

  @IsNotEmpty()
  @IsString()
  ReferenceQuitus: string;

  @IsString()
  @IsNotEmpty()
  objetQuitus: string;

  @IsNotEmpty()
  @IsNumber()
  montantQuitus: number;

  @IsNotEmpty()
  @IsNumber()
  exerciceAnnee: number;

  @IsNotEmpty()
  @IsString()
  observateur: string;

  @IsString()
  @IsNotEmpty()
  nomService: string;
}
