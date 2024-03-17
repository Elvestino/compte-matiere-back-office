import { Module } from '@nestjs/common';
import { FactureService } from './service/facture.service';
import { FactureController } from './controller/facture.controller';
import { Facture } from './entities/facture.entity';
import { Fournisseur } from '../fournisseur/entities/fournisseur.entity';
import { Ordre } from '../ordre/entities/ordre.entity';
import { OrdreModule } from '../ordre/ordre.module';
import { FournisseurModule } from '../fournisseur/fournisseur.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Facture, Fournisseur, Ordre]),
    OrdreModule,
    FournisseurModule,
  ],
  controllers: [FactureController],
  providers: [FactureService],
  exports: [FactureService],
})
export class FactureModule {}
