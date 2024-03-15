import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServiceService } from '../service/service.service';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { Service } from '../entities/service.entity';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
    return await this.serviceService.create(createServiceDto);
  }

  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':numService')
  findOne(@Param('numService') numService: number) {
    return this.serviceService.findOne(numService);
  }

  @Patch(':numService')
  update(
    @Param('numService') numService: number,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.serviceService.update(numService, updateServiceDto);
  }

  @Delete(':numService')
  remove(@Param('numService') numService: number) {
    return this.serviceService.remove(numService);
  }
}
