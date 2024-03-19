import { Injectable } from '@nestjs/common';
import { CreateEntreeDto } from '../dto/create-entree.dto';
import { UpdateEntreeDto } from '../dto/update-entree.dto';
import { Entree } from '../entities/entree.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Facture } from 'src/modules/facture/entities/facture.entity';
import { Annee } from 'src/modules/annee/entities/annee.entity';

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
    const { numFacture, newannee } = createDto;

    const facture = await this.factureRepository.findOne({
      where: { numFacture: createDto.numFacture },
    });
    if (!facture) {
      throw new Error(`facture with numFacture ${numFacture} not found.`);
    }
    const annee = await this.anneerepository.findOne({
      where: { newannee: createDto.newannee },
    });
    if (!annee) {
      throw new Error(`Annee with newannee ${newannee} not found.`);
    }
    try {
      const entree = new Entree();
      entree.numEntree = createDto.numEntree;
      entree.numFolioGL = createDto.numFolioGL;
      entree.nomenclature = createDto.nomenclature;
      entree.designation = createDto.designation;
      entree.espaceUnitaire = createDto.espaceUnitaire;
      entree.quantite = createDto.quantite;
      entree.prix = createDto.prix;

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

  findOne(numEntree: number): Promise<Entree> {
    return this.entreeRepository.findOne({
      where: { numEntree },
      relations: ['entree'],
    });
  }

  async update(numEntree: number, updateDto: UpdateEntreeDto): Promise<Entree> {
    try {
      const { numFacture, newannee } = updateDto;

      const existingentree = await this.entreeRepository.findOneOrFail({
        where: { numEntree },
        relations: ['facture', 'annee'],
      });
      if (!existingentree) {
        throw new Error(`Ordre with numEntree ${numEntree} not found.`);
      }
      const facture = await this.factureRepository.findOneOrFail({
        where: { numFacture },
      });
      if (!facture) {
        throw new Error(`Facture with numFacture ${numFacture} not found.`);
      }

      const annee = await this.anneerepository.findOneOrFail({
        where: { newannee },
      });
      if (!annee) {
        throw new Error(`Annee with newannee ${newannee} not found.`);
      }

      existingentree.numFolioGL = updateDto.numFolioGL;
      existingentree.nomenclature = updateDto.nomenclature;
      existingentree.designation = updateDto.designation;
      existingentree.espaceUnitaire = updateDto.espaceUnitaire;
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

  remove(numEntree: number) {
    return this.entreeRepository.delete(numEntree);
  }
}
