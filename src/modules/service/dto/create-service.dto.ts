import { IsNotEmpty } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  nomService: string;

  @IsNotEmpty()
  libelle: string;

  @IsNotEmpty()
  SOA: string;

  @IsNotEmpty()
  typeService: string;
}
