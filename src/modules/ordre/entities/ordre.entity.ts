import { Annee } from 'src/modules/annee/entities/annee.entity';
import { Facture } from 'src/modules/facture/entities/facture.entity';
import { Service } from 'src/modules/service/entities/service.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Ordre {
  @PrimaryColumn()
  numOrdre: number;

  @Column({ type: 'date' })
  dateOrdre: Date;

  @ManyToOne(() => Service, (service) => service.ordres, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'numService' })
  service: Service;

  @ManyToOne(() => Annee, (annee) => annee.ordres, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'newannee' })
  annee: Annee;

  @OneToMany(() => Facture, (facture) => facture.ordre, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  factures: Facture[];
}
