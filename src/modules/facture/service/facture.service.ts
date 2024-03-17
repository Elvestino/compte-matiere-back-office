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
      throw new Error(`Facture with numFrns ${numFrns} not found.`);
    }
    const ordre = await this.Ordrerepository.findOne({
      where: { numOrdre: CreateFactureDto.numOrdre },
    });
    if (!ordre) {
      throw new Error(`Ordre with numOrdre ${numOrdre} not found.`);
    }
    try {
      const facture = new Facture();
      CreateFactureDto;
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
      relations: ['facture'],
    });
  }

  async update(
    numFacture: number,
    updateFactureDto: UpdateFactureDto,
  ): Promise<Facture> {
    await this.Factureepository.update(numFacture, updateFactureDto);
    return this.findOne(numFacture);
  }

  async delete(numFacture: number): Promise<void> {
    await this.Factureepository.delete(numFacture);
  }
}
