import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ unique: true })
  immatricule: string;

  @Column()
  nomComplet: string;

  @Column()
  grade: string;

  @Column()
  password: string;
}
