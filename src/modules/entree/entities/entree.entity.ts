import { Annee } from 'src/modules/annee/entities/annee.entity';
import { Facture } from 'src/modules/facture/entities/facture.entity';
import { Sortie } from 'src/modules/sortie/entities/sortie.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Entree {
  @PrimaryColumn()
  numEntree: number;
  @Column()
  numFolioGL: number;
  @Column()
  nomenclature: number;
  @Column()
  designation: string;
  @Column()
  especeUnitaire: string;
  @Column()
  quantite: number;
  @Column()
  prix: number;

  @ManyToOne(() => Annee, (annee) => annee.entree, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'newannee' })
  annee: Annee;

  @ManyToOne(() => Facture, (facture) => facture.entree, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'numFacture' })
  facture: Facture;

  @OneToMany(() => Sortie, (sortie) => sortie.entree, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  sortie: Sortie[];
}
