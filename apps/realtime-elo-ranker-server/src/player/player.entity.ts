import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlayerEnt {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  rank: number;
}
