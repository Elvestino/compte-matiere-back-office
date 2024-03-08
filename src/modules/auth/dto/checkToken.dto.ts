import { IsNotEmpty, IsString } from 'class-validator';

export class CheckTokenDto {
  @IsNotEmpty()
  @IsString()
  token: string;
}
