import { Column, Entity, PrimaryColumn } from 'typeorm';

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
}
