import { Ordre } from 'src/modules/ordre/entities/ordre.entity';
import { Quitus } from 'src/modules/quitus/entities/quitus.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
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

  @OneToMany(() => Ordre, (ordre) => ordre.service, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  ordres: Ordre[];
  @OneToMany(() => Quitus, (quitus) => quitus.service, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  quitus: Ordre[];
}
