import { Annee } from 'src/modules/annee/entities/annee.entity';
import { Facture } from 'src/modules/facture/entities/facture.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

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
  espaceUnitaire: string;
  @Column()
  quantite: number;
  @Column()
  prix: number;

  @ManyToOne(() => Annee, (annee) => annee.entree, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  annee: Annee;

  @ManyToOne(() => Facture, (facture) => facture.entree, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  facture: Facture;
}
