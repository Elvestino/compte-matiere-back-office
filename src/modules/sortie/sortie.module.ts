import { Module } from '@nestjs/common';
import { SortieService } from './service/sortie.service';
import { SortieController } from './controller/sortie.controller';
import { EntreeModule } from '../entree/entree.module';
import { Sortie } from './entities/sortie.entity';
import { Entree } from '../entree/entities/entree.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Sortie, Entree]), EntreeModule],
  controllers: [SortieController],
  providers: [SortieService],
  exports: [SortieService],
})
export class SortieModule {}
