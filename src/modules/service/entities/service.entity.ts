import { Ordre } from 'src/modules/ordre/entities/ordre.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
@Entity()
export class Service {
  @PrimaryColumn()
  numService: number;

  @Column()
  nomService: string;

  @Column()
  libelle: string;

  @Column()
  SOA: string;

  @Column()
  typeService: string;

  @ManyToOne(() => Ordre, (ordre) => ordre.service)
  ordres: Ordre;
}
