import { Injectable } from '@nestjs/common';
import { CreateEntreeDto } from '../dto/create-entree.dto';
import { UpdateEntreeDto } from '../dto/update-entree.dto';
import { Entree } from '../entities/entree.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Facture } from 'src/modules/facture/entities/facture.entity';
import { Annee } from 'src/modules/annee/entities/annee.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class EntreeService {
  constructor(
    @InjectRepository(Entree)
    private readonly entreeRepository: Repository<Entree>,
    @InjectRepository(Facture)
    private readonly factureRepository: Repository<Facture>,
    @InjectRepository(Annee)
    private readonly anneerepository: Repository<Annee>,
  ) {}

  async create(createDto: CreateEntreeDto): Promise<Entree> {
    const facture = await this.factureRepository.findOne({
      where: { destination: createDto.destination },
    });
    if (!facture) {
      throw new Error(`facture with destination  not found.`);
    }
    const annee = await this.anneerepository.findOne({
      where: { newannee: createDto.newannee },
    });
    if (!annee) {
      throw new Error(`Annee with newannee not found.`);
    }
    try {
      const entree = this.entreeRepository.create(createDto);
      entree.numEntree = uuid();
      // entree.numFolioGL = createDto.numFolioGL;
      // entree.nomenclature = createDto.nomenclature;
      // entree.designation = createDto.designation;
      // entree.especeUnitaire = createDto.especeUnitaire;
      // entree.quantite = createDto.quantite;
      // entree.prix = createDto.prix;

      entree.facture = facture;
      entree.annee = annee;
      const saveEntree = await this.entreeRepository.save(entree);
      return saveEntree;
    } catch (error) {
      throw new Error(`Erreur lors de l'entree du materiel: ${error.message}`);
    }
  }

  findAll(): Promise<Entree[]> {
    return this.entreeRepository.find({ relations: ['annee', 'facture'] });
  }

  findOne(numEntree: string): Promise<Entree> {
    return this.entreeRepository.findOne({
      where: { numEntree },
      relations: ['entree', 'sortie'],
    });
  }

  async update(updateDto: UpdateEntreeDto): Promise<Entree> {
    try {
      const existingentree = await this.entreeRepository.findOneOrFail({
        where: { numEntree: updateDto.numEntree },
        relations: ['facture', 'annee'],
      });
      if (!existingentree) {
        throw new Error(`Ordre with numEntree not found.`);
      }
      const facture = await this.factureRepository.findOneOrFail({
        where: { destination: updateDto.destination },
      });
      if (!facture) {
        throw new Error(`Facture with designation not found.`);
      }

      const annee = await this.anneerepository.findOneOrFail({
        where: { newannee: updateDto.newannee },
      });
      if (!annee) {
        throw new Error(`Annee with newannee  not found.`);
      }

      existingentree.numFolioGL = updateDto.numFolioGL;
      existingentree.nomenclature = updateDto.nomenclature;
      existingentree.designation = updateDto.designation;
      existingentree.especeUnitaire = updateDto.especeUnitaire;
      existingentree.quantite = updateDto.quantite;
      existingentree.prix = updateDto.prix;

      existingentree.facture = facture;
      existingentree.annee = annee;

      const updatedOrdre = await this.entreeRepository.save(existingentree);
      return updatedOrdre;
    } catch (error) {
      console.log(error);
      throw new Error(
        `Erreur lors de la modification de l'ordre: ${error.message}`,
      );
    }
  }

  remove(numEntree: string) {
    return this.entreeRepository.delete(numEntree);
  }
}
