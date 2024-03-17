import { Module } from '@nestjs/common';
import { FournisseurService } from './services/fournisseur.service';
import { FournisseurController } from './controller/fournisseur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fournisseur } from './entities/fournisseur.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fournisseur])],
  controllers: [FournisseurController],
  providers: [FournisseurService],
  exports: [FournisseurService],
})
export class FournisseurModule {}
