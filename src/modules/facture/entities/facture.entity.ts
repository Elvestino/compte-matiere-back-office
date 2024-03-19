import { Entree } from 'src/modules/entree/entities/entree.entity';
import { Fournisseur } from 'src/modules/fournisseur/entities/fournisseur.entity';
import { Ordre } from 'src/modules/ordre/entities/ordre.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Facture {
  @PrimaryColumn()
  numFacture: number;
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

  @ManyToOne(() => Fournisseur, (fournisseur) => fournisseur.factures)
  fournisseur: Fournisseur;

  @ManyToOne(() => Ordre, (ordre) => ordre.factures)
  ordre: Ordre;

  @OneToMany(() => Entree, (entree) => entree.facture)
  entree: Entree[];
}
