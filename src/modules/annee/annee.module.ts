import { Module } from '@nestjs/common';
import { AnneeService } from './service/annee.service';
import { AnneeController } from './controller/annee.controller';
import { Annee } from './entities/annee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Annee])],
  controllers: [AnneeController],
  providers: [AnneeService],
  exports: [AnneeService],
})
export class AnneeModule {}
