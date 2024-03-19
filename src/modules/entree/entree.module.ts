import { Module } from '@nestjs/common';
import { EntreeService } from './service/entree.service';
import { EntreeController } from './controller/entree.controller';
import { Entree } from './entities/entree.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facture } from '../facture/entities/facture.entity';
import { Annee } from '../annee/entities/annee.entity';
import { AnneeModule } from '../annee/annee.module';
import { FactureModule } from '../facture/facture.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Entree, Facture, Annee]),
    AnneeModule,
    FactureModule,
  ],
  controllers: [EntreeController],
  providers: [EntreeService],
  exports: [EntreeService],
})
export class EntreeModule {}
