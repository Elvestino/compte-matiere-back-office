import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnneeDto } from '../dto/create-annee.dto';
import { Annee } from '../entities/annee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AnneeService {
  constructor(
    @InjectRepository(Annee)
    private readonly AnneeRepository: Repository<Annee>,
  ) {}
  async create(createAnneeDto: CreateAnneeDto): Promise<Annee> {
    try {
      await this.AnneeRepository.create(createAnneeDto);
      return this.AnneeRepository.save(createAnneeDto);
    } catch (error) {
      console.log('error', error);
    }
  }

  async remove(newannee: number): Promise<Annee> {
    const newsannee = await this.AnneeRepository.findOne({
      where: { newannee },
    });
    if (!newsannee) {
      throw new NotFoundException('Annee pas trouver');
    }
    await this.AnneeRepository.remove(newsannee);
    return newsannee;
  }
}
