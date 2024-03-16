import { Annee } from 'src/modules/annee/entities/annee.entity';
import { Service } from 'src/modules/service/entities/service.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Ordre {
  @PrimaryColumn()
  numOrdre: number;

  @Column({ type: 'date' })
  dateOrdre: Date;

  @ManyToOne(() => Service, (service) => service.ordres)
  //@JoinColumn({ name: 'numService' })
  service: Service;

  @ManyToOne(() => Annee, (annee) => annee.ordres)
  // @JoinColumn({ name: 'newannee' })
  annee: Annee;
}
