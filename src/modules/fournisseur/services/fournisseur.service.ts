import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFournisseurDto } from '../dto/create-fournisseur.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Fournisseur } from '../entities/fournisseur.entity';
import { UpdateFournisseurDto } from '../dto/update-fournisseur.dto';

@Injectable()
export class FournisseurService {
  constructor(
    @InjectRepository(Fournisseur)
    private readonly fournisseurRepository: Repository<Fournisseur>,
  ) {}
  async create(
    createFournisseurDto: CreateFournisseurDto,
  ): Promise<Fournisseur> {
    try {
      const newfrns = this.fournisseurRepository.create(createFournisseurDto);

      return await this.fournisseurRepository.save(newfrns);
    } catch (error) {
      throw new Error(
        `Erreur lors de la création du fournisseur: ${error.message}`,
      );
    }
  }
  findAll() {
    return this.fournisseurRepository.find();
  }

  async findOne(numFrns: number): Promise<Fournisseur | NotFoundException> {
    const newFrns = await this.fournisseurRepository.findOne({
      where: { numFrns },
    });
    if (!newFrns) {
      throw new NotFoundException('Numero fournisseur pas trouver');
    }
    return newFrns;
  }

  async update(
    numFrns: number,
    updateFournisseurDto: UpdateFournisseurDto,
  ): Promise<Fournisseur | NotFoundException> {
    try {
      const Frnsexist = await this.fournisseurRepository.findOneOrFail({
        where: { numFrns },
      });

      this.fournisseurRepository.merge(Frnsexist, updateFournisseurDto);

      const updatedFournisseur =
        await this.fournisseurRepository.save(Frnsexist);

      return updatedFournisseur;
    } catch (error) {
      throw new NotFoundException('numero Fournisseur pas trouver');
    }
  }

  async remove(numFrns: number): Promise<Fournisseur | NotFoundException> {
    const Fournisseur = await this.fournisseurRepository.findOne({
      where: { numFrns },
    });
    if (!Fournisseur) {
      throw new NotFoundException('Numero Fournisseur pas trouver');
    }
    await this.fournisseurRepository.remove(Fournisseur);
    return Fournisseur;
  }
}
