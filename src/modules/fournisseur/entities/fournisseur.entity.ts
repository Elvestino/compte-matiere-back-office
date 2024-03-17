import { Facture } from 'src/modules/facture/entities/facture.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Fournisseur {
  @PrimaryColumn()
  numFrns: number;

  @Column()
  nomFrns: string;

  @Column()
  prenomFrns: string;

  @Column()
  adrsFrns: string;

  @Column()
  telFrns: string;

  @Column()
  typeFrns: string;

  @OneToMany(() => Facture, (facture) => facture.numFacture)
  factures: Facture[];
}
