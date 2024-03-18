import { Injectable } from '@nestjs/common';
import { CreateOrdreDto } from '../dto/create-ordre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ordre } from '../entities/ordre.entity';
import { Service } from 'src/modules/service/entities/service.entity';
import { Annee } from 'src/modules/annee/entities/annee.entity';
import { UpdateOrdreDto } from '../dto/update-ordre.dto';

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
    const { numService, newannee } = createOrdreDto;

    const service = await this.ServiceRepository.findOne({
      where: { numService: createOrdreDto.numService },
    });
    if (!service) {
      throw new Error(`Service with numService ${numService} not found.`);
    }
    const annee = await this.anneerepository.findOne({
      where: { newannee: createOrdreDto.newannee },
    });
    if (!annee) {
      throw new Error(`Annee with newannee ${newannee} not found.`);
    }
    try {
      const ordre = new Ordre();
      ordre.numOrdre = createOrdreDto.numOrdre;
      ordre.dateOrdre = createOrdreDto.dateOrdre;
      ordre.service = service;
      ordre.annee = annee;
      const saveOrdre = await this.ordreRepository.save(ordre);
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

  findOne(numOrdre: number): Promise<Ordre> {
    return this.ordreRepository.findOne({
      where: { numOrdre },
      relations: ['ordre', 'facture'],
    });
  }

  async update(
    numOrdre: number,
    updateOrdreDto: UpdateOrdreDto,
  ): Promise<Ordre> {
    try {
      const { numService, newannee } = updateOrdreDto;

      const existingOrdre = await this.ordreRepository.findOneOrFail({
        where: { numOrdre },
        relations: ['service', 'annee'],
      });
      if (!existingOrdre) {
        throw new Error(`Ordre with numOrdre ${numOrdre} not found.`);
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
  async delete(numOrdre: number): Promise<void> {
    await this.ordreRepository.delete(numOrdre);
  }
}
