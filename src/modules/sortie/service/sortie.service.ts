import { Injectable } from '@nestjs/common';
import { CreateSortieDto } from '../dto/create-sortie.dto';
import { Entree } from 'src/modules/entree/entities/entree.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sortie } from '../entities/sortie.entity';
import { v4 as uuid } from 'uuid';
@Injectable()
export class SortieService {
  constructor(
    @InjectRepository(Entree)
    private readonly entreeRepository: Repository<Entree>,
    @InjectRepository(Sortie)
    private readonly sortieRepository: Repository<Sortie>,
  ) {}
  async create(createDto: CreateSortieDto): Promise<Sortie> {
    const entree = await this.entreeRepository.findOne({
      where: { numEntree: createDto.numEntree },
    });
    if (!entree) {
      throw new Error(`entree with numEntree not found.`);
    }

    try {
      const sortie = this.sortieRepository.create(createDto);
      sortie.numSortie = uuid();
      sortie.entree = entree;
      const savesortie = await this.sortieRepository.save(sortie);
      return savesortie;
    } catch (error) {
      throw new Error(`Erreur lors du sortie du materiel: ${error.message}`);
    }
  }

  findAll(): Promise<Sortie[]> {
    return this.sortieRepository.find({ relations: ['entree'] });
  }

  findOne(numSortie: string): Promise<Sortie> {
    return this.sortieRepository.findOne({
      where: { numSortie },
      relations: ['sortie'],
    });
  }

  remove(numSortie: string) {
    return this.sortieRepository.delete(numSortie);
  }
}
