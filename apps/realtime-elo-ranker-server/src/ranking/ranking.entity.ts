import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RankingEnt {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  rank: number;
}
