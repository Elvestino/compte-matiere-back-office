import { IsNotEmpty, Length } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @Length(1, 6)
  immatricule: string;

  @IsNotEmpty()
  @Length(1, 100)
  nomComplet: string;

  @IsNotEmpty()
  @Length(1, 100)
  grade: string;

  @IsNotEmpty()
  @Length(1, 100)
  password: string;
}
