import { IsNotEmpty, IsString } from 'class-validator';

export class CheckTokenDto {
  @IsNotEmpty()
  @IsString()
  access_token: string;
}
