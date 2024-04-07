import { Entree } from 'src/modules/entree/entities/entree.entity';
import { Fournisseur } from 'src/modules/fournisseur/entities/fournisseur.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Facture {
  @PrimaryColumn()
  numFacture: string;
  @Column({ type: 'date' })
  dateFacture: Date;
  @Column()
  destination: string;
  @Column()
  objetFacture: string;
  @Column()
  LieuFacture: string;
  @Column()
  montantFacture: number;
  @Column()
  typeFacture: string;

  @ManyToOne(() => Fournisseur, (fournisseur) => fournisseur.factures, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'numFrns' })
  fournisseur: Fournisseur;

  @OneToMany(() => Entree, (entree) => entree.facture, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  entree: Entree[];
}
