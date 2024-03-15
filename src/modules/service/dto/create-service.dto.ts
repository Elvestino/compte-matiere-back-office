import { IsNotEmpty } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  numService: number;

  @IsNotEmpty()
  nomService: string;

  @IsNotEmpty()
  libelle: string;

  @IsNotEmpty()
  SOA: string;

  @IsNotEmpty()
  typeService: string;
}
