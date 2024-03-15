import { Ordre } from 'src/modules/ordre/entities/ordre.entity';
import { Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Annee {
  @PrimaryColumn()
  newannee: number;

  @OneToMany(() => Ordre, (ordre) => ordre.annee)
  ordres: Ordre[];
}
