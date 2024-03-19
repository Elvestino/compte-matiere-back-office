import { PartialType } from '@nestjs/mapped-types';
import { CreateQuitusDto } from './create-quitus.dto';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class UpdateQuitusDto extends PartialType(CreateQuitusDto) {
  @IsNumber()
  numQuitus: number;
  @IsDate()
  dateQuitus: Date;
  @IsString()
  ReferenceQuitus: string;
  @IsString()
  objetQuitus: string;
  @IsNumber()
  montantQuitus: number;
  @IsNumber()
  exerciceAnnee: number;
  @IsString()
  observateur: string;

  @IsNumber()
  numService: number;
}
