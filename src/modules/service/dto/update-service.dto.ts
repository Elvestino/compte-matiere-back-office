import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @IsNotEmpty()
  numService: number;

  @IsNotEmpty()
  @IsString()
  nomService: string;

  @IsNotEmpty()
  @IsString()
  libelle: string;

  @IsNotEmpty()
  @IsString()
  SOA: string;

  @IsNotEmpty()
  @IsString()
  typeService: string;
}
