import { Entree } from 'src/modules/entree/entities/entree.entity';
import { Ordre } from 'src/modules/ordre/entities/ordre.entity';
import { Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Annee {
  @PrimaryColumn()
  newannee: number;

  @OneToMany(() => Ordre, (ordre) => ordre.annee, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  ordres: Ordre[];

  @OneToMany(() => Entree, (entree) => entree.annee, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  entree: Entree[];
}
