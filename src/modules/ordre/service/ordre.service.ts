import { Injectable } from '@nestjs/common';
import { CreateOrdreDto } from '../dto/create-ordre.dto';
//import { UpdateOrdreDto } from '../dto/update-ordre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ordre } from '../entities/ordre.entity';
import { Service } from 'src/modules/service/entities/service.entity';
import { Annee } from 'src/modules/annee/entities/annee.entity';

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

  findAll() {
    return `This action returns all ordre`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordre`;
  }

  // update(id: number, updateOrdreDto: UpdateOrdreDto) {
  //   return `This action updates a #${id} ordre`;
  // }

  remove(id: number) {
    return `This action removes a #${id} ordre`;
  }
}
