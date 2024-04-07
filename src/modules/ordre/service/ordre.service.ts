import { Injectable } from '@nestjs/common';
import { CreateOrdreDto } from '../dto/create-ordre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ordre } from '../entities/ordre.entity';
import { Service } from 'src/modules/service/entities/service.entity';
import { Annee } from 'src/modules/annee/entities/annee.entity';
import { UpdateOrdreDto } from '../dto/update-ordre.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class OrdreService {
  constructor(
    @InjectRepository(Ordre)
    private readonly ordreRepository: Repository<Ordre>,
    @InjectRepository(Service)
    private readonly ServiceRepository: Repository<Service>,
    @InjectRepository(Annee)
    private readonly anneerepository: Repository<Annee>,
  ) {}
  async create(createOrdreDto: CreateOrdreDto): Promise<Ordre> {
    const service = await this.ServiceRepository.findOne({
      where: { numService: createOrdreDto.numService },
    });
    if (!service) {
      throw new Error(`Service with numService not found.`);
    }
    const annee = await this.anneerepository.findOne({
      where: { newannee: createOrdreDto.newannee },
    });
    if (!annee) {
      throw new Error(`Annee with newannee not found.`);
    }
    try {
      const newOrdre = this.ordreRepository.create(createOrdreDto);
      newOrdre.numOrdre = uuid();
      newOrdre.service = service;
      newOrdre.annee = annee;
      const saveOrdre = await this.ordreRepository.save(newOrdre);
      return saveOrdre;
    } catch (error) {
      throw new Error(
        `Erreur lors de la création de l'ordre: ${error.message}`,
      );
    }
  }

  findAll(): Promise<Ordre[]> {
    return this.ordreRepository.find({ relations: ['annee', 'service'] });
  }

  findOne(numOrdre: string): Promise<Ordre> {
    return this.ordreRepository.findOne({
      where: { numOrdre },
      relations: ['ordre', 'facture'],
    });
  }

  async update(updateOrdreDto: UpdateOrdreDto): Promise<Ordre> {
    try {
      const { numService, newannee } = updateOrdreDto;

      const existingOrdre = await this.ordreRepository.findOneOrFail({
        where: { numOrdre: updateOrdreDto.numOrdre },
        relations: ['service', 'annee'],
      });
      if (!existingOrdre) {
        throw new Error(`Ordre with numOrdre not found.`);
      }
      const service = await this.ServiceRepository.findOneOrFail({
        where: { numService },
      });
      if (!service) {
        throw new Error(`Service with numService ${numService} not found.`);
      }

      const annee = await this.anneerepository.findOneOrFail({
        where: { newannee },
      });
      if (!annee) {
        throw new Error(`Annee with newannee ${newannee} not found.`);
      }

      existingOrdre.dateOrdre = updateOrdreDto.dateOrdre;
      existingOrdre.service = service;
      existingOrdre.annee = annee;

      const updatedOrdre = await this.ordreRepository.save(existingOrdre);
      return updatedOrdre;
    } catch (error) {
      console.log(error);
      throw new Error(
        `Erreur lors de la modification de l'ordre: ${error.message}`,
      );
    }
  }

  delete(numOrdre: string) {
    return this.ordreRepository.delete(numOrdre);
  }
}
