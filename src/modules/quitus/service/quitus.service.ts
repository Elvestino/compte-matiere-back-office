import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuitusDto } from '../dto/create-quitus.dto';
import { UpdateQuitusDto } from '../dto/update-quitus.dto';
import { Service } from 'src/modules/service/entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quitus } from '../entities/quitus.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class QuitusService {
  constructor(
    @InjectRepository(Quitus)
    private readonly quitusRepository: Repository<Quitus>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}
  async create(createDto: CreateQuitusDto): Promise<Quitus> {
    const service = await this.serviceRepository.findOne({
      where: { nomService: createDto.nomService },
    });
    if (!service) {
      throw new Error(`Service with numService  not found.`);
    }

    try {
      const quitus = this.quitusRepository.create(createDto);

      quitus.numQuitus = uuid();
      quitus.dateQuitus = createDto.dateQuitus;
      quitus.ReferenceQuitus = createDto.ReferenceQuitus;
      quitus.objetQuitus = createDto.objetQuitus;
      quitus.montantQuitus = createDto.montantQuitus;
      quitus.exerciceAnnee = createDto.exerciceAnnee;
      quitus.observateur = createDto.observateur;
      quitus.service = service;

      this.quitusRepository;
      const saveQuitus = await this.quitusRepository.save(quitus);
      return saveQuitus;
    } catch (error) {
      throw new Error(`Erreur lors de la création du quitus: ${error.message}`);
    }
  }

  findAll(): Promise<Quitus[]> {
    return this.quitusRepository.find({ relations: ['service'] });
  }

  findOne(numQuitus: string): Promise<Quitus> {
    return this.quitusRepository.findOne({
      where: { numQuitus },
      relations: ['quitus'],
    });
  }

  async update(updateDto: UpdateQuitusDto): Promise<Quitus> {
    try {
      const existingquitus = await this.quitusRepository.findOneOrFail({
        where: { numQuitus: updateDto.numQuitus },
        relations: ['service'],
      });
      if (!existingquitus) {
        throw new NotFoundException(`Quitus not found...`);
      }
      const service = await this.serviceRepository.findOneOrFail({
        where: { nomService: updateDto.nomService },
      });
      if (!service) {
        throw new NotFoundException(`Service not found.`);
      }
      existingquitus.dateQuitus = updateDto.dateQuitus;
      existingquitus.ReferenceQuitus = updateDto.ReferenceQuitus;
      existingquitus.objetQuitus = updateDto.objetQuitus;
      existingquitus.montantQuitus = updateDto.montantQuitus;
      existingquitus.exerciceAnnee = updateDto.exerciceAnnee;
      existingquitus.observateur = updateDto.observateur;
      existingquitus.service = service;

      const updatedquitus = await this.quitusRepository.save(existingquitus);
      return updatedquitus;
    } catch (error) {
      console.log(error);
      throw new Error(
        `Erreur lors de la modification du quitus: ${error.message}`,
      );
    }
  }

  remove(numQuitus: string) {
    return this.quitusRepository.delete(numQuitus);
  }
}
