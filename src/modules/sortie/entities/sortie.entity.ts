import { Entree } from 'src/modules/entree/entities/entree.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sortie {
  @PrimaryGeneratedColumn()
  numSortie: number;

  @ManyToOne(() => Entree, (entree) => entree.sortie, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'numEntree' })
  entree: Entree;
}
