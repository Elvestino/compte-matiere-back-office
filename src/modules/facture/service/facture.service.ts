import { Fournisseur } from 'src/modules/fournisseur/entities/fournisseur.entity';
import { Injectable } from '@nestjs/common';
import { CreateFactureDto } from '../dto/create-facture.dto';
import { UpdateFactureDto } from '../dto/update-facture.dto';
import { Facture } from '../entities/facture.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FactureService {
  constructor(
    @InjectRepository(Facture)
    private readonly Factureepository: Repository<Facture>,
    @InjectRepository(Fournisseur)
    private readonly FournisseurRepository: Repository<Fournisseur>,
  ) {}

  async create(CreateFactureDto: CreateFactureDto): Promise<Facture> {
    const fournisseur = await this.FournisseurRepository.findOne({
      where: { nomFrns: CreateFactureDto.nomFrns },
    });
    if (!fournisseur) {
      throw new Error(`Fournisseur with nomFrns not found.`);
    }
    try {
      const facture = new Facture();
      facture.numFacture = uuid();
      facture.dateFacture = CreateFactureDto.dateFacture;
      facture.destination = CreateFactureDto.destination;
      facture.objetFacture = CreateFactureDto.objetFacture;
      facture.LieuFacture = CreateFactureDto.LieuFacture;
      facture.montantFacture = CreateFactureDto.montantFacture;
      facture.typeFacture = CreateFactureDto.typeFacture;
      facture.fournisseur = fournisseur;
      const savefacture = await this.Factureepository.save(facture);
      return savefacture;
    } catch (error) {
      throw new Error(
        `Erreur lors de la création du facture: ${error.message}`,
      );
    }
  }

  findAll(): Promise<Facture[]> {
    return this.Factureepository.find({ relations: ['fournisseur'] });
  }

  findOne(numFacture: string): Promise<Facture> {
    return this.Factureepository.findOne({
      where: { numFacture },
      relations: ['facture', 'entree'],
    });
  }

  async update(
    numFacture: string,
    updateFactureDto: UpdateFactureDto,
  ): Promise<Facture> {
    try {
      const existingFacture = await this.Factureepository.findOneOrFail({
        where: { numFacture: updateFactureDto.numFacture },
        relations: ['fournisseur'],
      });
      const frns = await this.FournisseurRepository.findOneOrFail({
        where: { nomFrns: updateFactureDto.nomFrns },
      });
      if (!frns) {
        throw new Error(`Fournisseur with numFrns ${numFacture} not found.`);
      }

      existingFacture.dateFacture = updateFactureDto.dateFacture;
      existingFacture.destination = updateFactureDto.destination;
      existingFacture.objetFacture = updateFactureDto.objetFacture;
      existingFacture.LieuFacture = updateFactureDto.LieuFacture;
      existingFacture.montantFacture = updateFactureDto.montantFacture;
      existingFacture.typeFacture = updateFactureDto.typeFacture;
      existingFacture.fournisseur = frns;

      const updatedFacture = await this.Factureepository.save(existingFacture);
      return updatedFacture;
    } catch (error) {
      console.log(error);
      throw new Error(
        `Erreur lors de la modification du facture: ${error.message}`,
      );
    }
  }

  async delete(numFacture: string): Promise<void> {
    await this.Factureepository.delete(numFacture);
  }
}
