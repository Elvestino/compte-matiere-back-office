import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  immatricule: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
