import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  immatricule: string;

  @IsString()
  nomComplet: string;

  @IsString()
  @IsNotEmpty()
  grade: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
