import { Entree } from 'src/modules/entree/entities/entree.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Sortie {
  @PrimaryColumn()
  numSortie: string;

  @ManyToOne(() => Entree, (entree) => entree.sortie, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'numEntree' })
  entree: Entree;
}
