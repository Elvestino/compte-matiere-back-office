import { Ordre } from 'src/modules/ordre/entities/ordre.entity';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Annee {
  @PrimaryColumn()
  newannee: number;

  @ManyToOne(() => Ordre, (ordre) => ordre.annee)
  ordres: Ordre;
}
