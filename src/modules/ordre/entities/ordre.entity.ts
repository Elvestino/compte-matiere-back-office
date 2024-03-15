import { Annee } from 'src/modules/annee/entities/annee.entity';
import { Service } from 'src/modules/service/entities/service.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Ordre {
  @PrimaryColumn()
  numOrdre: number;

  @Column({ type: Date })
  dateOrdre: Date;

  @OneToMany(() => Service, (service) => service.ordres)
  @JoinColumn({ name: 'numService' })
  service: Service[];

  @OneToMany(() => Annee, (annee) => annee.ordres)
  @JoinColumn({ name: 'newannee' })
  annee: Annee[];
}
