import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateQuitusDto {
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
