import { Injectable } from '@nestjs/common';
import { CreateSortieDto } from '../dto/create-sortie.dto';
import { Entree } from 'src/modules/entree/entities/entree.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sortie } from '../entities/sortie.entity';

@Injectable()
export class SortieService {
  constructor(
    @InjectRepository(Entree)
    private readonly entreeRepository: Repository<Entree>,
    @InjectRepository(Sortie)
    private readonly sortieRepository: Repository<Sortie>,
  ) {}
  async create(createDto: CreateSortieDto): Promise<Sortie> {
    const { numEntree } = createDto;

    const entree = await this.entreeRepository.findOne({
      where: { numEntree: createDto.numEntree },
    });
    if (!entree) {
      throw new Error(`entree with numEntree ${numEntree} not found.`);
    }

    try {
      const sortie = new Sortie();
      sortie.numSortie = createDto.numSortie;
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

  findOne(numSortie: number): Promise<Sortie> {
    return this.sortieRepository.findOne({
      where: { numSortie },
      relations: ['sortie'],
    });
  }

  remove(numSortie: number) {
    return this.sortieRepository.delete(numSortie);
  }
}
