import { Service } from './../entities/service.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly ServiceRepository: Repository<Service>,
  ) {}
  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    try {
      const newservice = this.ServiceRepository.create(createServiceDto);

      return await this.ServiceRepository.save(newservice);
    } catch (error) {
      throw new Error(
        `Erreur lors de la creation du service': ${error.message}`,
      );
    }
  }

  findAll() {
    return this.ServiceRepository.find();
  }

  async findOne(numService: number): Promise<Service | NotFoundException> {
    const newService = await this.ServiceRepository.findOne({
      where: { numService },
    });
    if (!newService) {
      throw new NotFoundException('Numero service pas trouver');
    }
    return newService;
  }

  async update(
    numService: number,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service | NotFoundException> {
    try {
      const Serviceexist = await this.ServiceRepository.findOneOrFail({
        where: { numService },
      });

      this.ServiceRepository.merge(Serviceexist, updateServiceDto);

      const updateService = await this.ServiceRepository.save(Serviceexist);

      return updateService;
    } catch (error) {
      throw new NotFoundException('numero service pas trouver');
    }
  }

  async remove(numService: number): Promise<Service | NotFoundException> {
    const Service = await this.ServiceRepository.findOne({
      where: { numService },
    });
    if (!Service) {
      throw new NotFoundException('Numero service pas trouver');
    }
    await this.ServiceRepository.remove(Service);
    return Service;
  }
}
