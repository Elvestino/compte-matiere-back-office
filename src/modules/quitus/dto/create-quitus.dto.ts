import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateQuitusDto {
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
  nomService: string;
}
