import { Module } from '@nestjs/common';
import { OrdreService } from './service/ordre.service';
import { OrdreController } from './controller/ordre.controller';
import { Ordre } from './entities/ordre.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnneeModule } from '../annee/annee.module';
import { ServiceModule } from '../service/service.module';
import { Annee } from '../annee/entities/annee.entity';
import { Service } from '../service/entities/service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ordre, Annee, Service]),
    AnneeModule,
    ServiceModule,
  ],
  controllers: [OrdreController],
  providers: [OrdreService],
  exports: [OrdreService],
})
export class OrdreModule {}
