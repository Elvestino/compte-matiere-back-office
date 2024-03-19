import { Module } from '@nestjs/common';
import { QuitusService } from './service/quitus.service';
import { QuitusController } from './controller/quitus.controller';
import { Quitus } from './entities/quitus.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from '../service/entities/service.entity';
import { ServiceModule } from '../service/service.module';

@Module({
  imports: [TypeOrmModule.forFeature([Quitus, Service]), ServiceModule],
  controllers: [QuitusController],
  providers: [QuitusService],
  exports: [QuitusService],
})
export class QuitusModule {}
