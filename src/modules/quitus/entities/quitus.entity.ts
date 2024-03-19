import { Service } from 'src/modules/service/entities/service.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Quitus {
  @PrimaryColumn()
  numQuitus: number;
  @Column({ type: 'date' })
  dateQuitus: Date;
  @Column()
  ReferenceQuitus: string;
  @Column()
  objetQuitus: string;
  @Column()
  montantQuitus: number;
  @Column()
  exerciceAnnee: number;
  @Column()
  observateur: string;

  @ManyToOne(() => Service, (service) => service.quitus)
  service: Service;
}
