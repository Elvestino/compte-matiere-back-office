import { IsString } from 'class-validator';

export class CreateSortieDto {
  @IsString()
  numSortie: string;

  @IsString()
  numEntree: string;
}
