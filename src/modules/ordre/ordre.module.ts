import { Module } from '@nestjs/common';
import { OrdreService } from './service/ordre.service';
import { OrdreController } from './controller/ordre.controller';
import { Ordre } from './entities/ordre.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ServiceModule } from '../service/service.module';
import { AnneeModule } from '../annee/annee.module';
import { ServiceModule } from '../service/service.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ordre]), AnneeModule, ServiceModule],
  controllers: [OrdreController],
  providers: [OrdreService],
  exports: [OrdreService],
})
export class OrdreModule {}
