import { IsNotEmpty } from 'class-validator';

export class CreateAnneeDto {
  @IsNotEmpty()
  newannee: number;
}
