import { Ordre } from 'src/modules/ordre/entities/ordre.entity';
import { Fournisseur } from 'src/modules/fournisseur/entities/fournisseur.entity';
import { Injectable } from '@nestjs/common';
import { CreateFactureDto } from '../dto/create-facture.dto';
import { UpdateFactureDto } from '../dto/update-facture.dto';
import { Facture } from '../entities/facture.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FactureService {
  constructor(
    @InjectRepository(Facture)
    private readonly Factureepository: Repository<Facture>,
    @InjectRepository(Fournisseur)
    private readonly FournisseurRepository: Repository<Fournisseur>,
    @InjectRepository(Ordre)
    private readonly Ordrerepository: Repository<Ordre>,
  ) {}

  async create(CreateFactureDto: CreateFactureDto): Promise<Facture> {
    const { numFrns, numOrdre } = CreateFactureDto;

    const fournisseur = await this.FournisseurRepository.findOne({
      where: { numFrns: CreateFactureDto.numFrns },
    });
    if (!fournisseur) {
      throw new Error(`Fournisseur with numFrns ${numFrns} not found.`);
    }

    const ordre = await this.Ordrerepository.findOne({
      where: { numOrdre: CreateFactureDto.numOrdre },
    });
    if (!ordre) {
      throw new Error(`Ordre with numOrdre ${numOrdre} not found.`);
    }
    try {
      const facture = new Facture();
      facture.numFacture = CreateFactureDto.numFacture;
      facture.dateFacture = CreateFactureDto.dateFacture;
      facture.destination = CreateFactureDto.destination;
      facture.objetFacture = CreateFactureDto.objetFacture;
      facture.LieuFacture = CreateFactureDto.LieuFacture;
      facture.montantFacture = CreateFactureDto.montantFacture;
      facture.typeFacture = CreateFactureDto.typeFacture;
      facture.fournisseur = fournisseur;
      facture.ordre = ordre;
      const savefacture = await this.Factureepository.save(facture);
      return savefacture;
    } catch (error) {
      throw new Error(
        `Erreur lors de la création du facture: ${error.message}`,
      );
    }
  }

  findAll(): Promise<Facture[]> {
    return this.Factureepository.find({ relations: ['ordre', 'fournisseur'] });
  }

  findOne(numFacture: number): Promise<Facture> {
    return this.Factureepository.findOne({
      where: { numFacture },
      relations: ['facture', 'entree'],
    });
  }

  async update(
    numFacture: number,
    updateFactureDto: UpdateFactureDto,
  ): Promise<Facture> {
    try {
      const { numFrns, numOrdre } = updateFactureDto;

      const existingFacture = await this.Factureepository.findOneOrFail({
        where: { numFacture },
        relations: ['fournisseur', 'ordre'],
      });
      if (!existingFacture) {
        throw new Error(`Ordre with numOrdre ${numOrdre} not found.`);
      }
      const frns = await this.FournisseurRepository.findOneOrFail({
        where: { numFrns },
      });
      if (!frns) {
        throw new Error(`Fournisseur with numFrns ${numFacture} not found.`);
      }

      const ordre = await this.Ordrerepository.findOneOrFail({
        where: { numOrdre },
      });
      if (!ordre) {
        throw new Error(`Ordre with numOrdre ${numOrdre} not found.`);
      }

      existingFacture.dateFacture = updateFactureDto.dateFacture;
      existingFacture.destination = updateFactureDto.destination;
      existingFacture.objetFacture = updateFactureDto.objetFacture;
      existingFacture.LieuFacture = updateFactureDto.LieuFacture;
      existingFacture.montantFacture = updateFactureDto.montantFacture;
      existingFacture.typeFacture = updateFactureDto.typeFacture;
      existingFacture.fournisseur = frns;
      existingFacture.ordre = ordre;

      const updatedFacture = await this.Factureepository.save(existingFacture);
      return updatedFacture;
    } catch (error) {
      console.log(error);
      throw new Error(
        `Erreur lors de la modification du facture: ${error.message}`,
      );
    }
  }

  async delete(numFacture: number): Promise<void> {
    await this.Factureepository.delete(numFacture);
  }
}
