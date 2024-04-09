import { Service } from 'src/modules/service/entities/service.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Quitus {
  @PrimaryColumn()
  numQuitus: string;
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

  @ManyToOne(() => Service, (service) => service.quitus, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'nomService' })
  service: Service;
}
