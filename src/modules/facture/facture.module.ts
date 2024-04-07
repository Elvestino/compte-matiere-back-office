import { Module } from '@nestjs/common';
import { FactureService } from './service/facture.service';
import { FactureController } from './controller/facture.controller';
import { Facture } from './entities/facture.entity';
import { Fournisseur } from '../fournisseur/entities/fournisseur.entity';

import { FournisseurModule } from '../fournisseur/fournisseur.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Facture, Fournisseur]),
    FournisseurModule,
  ],
  controllers: [FactureController],
  providers: [FactureService],
  exports: [FactureService],
})
export class FactureModule {}
