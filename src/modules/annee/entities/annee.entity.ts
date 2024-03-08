import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Annee {
  @PrimaryColumn()
  newannee: number;
}
