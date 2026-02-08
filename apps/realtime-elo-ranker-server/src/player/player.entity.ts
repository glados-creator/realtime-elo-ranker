import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class PlayerEnt {
  @PrimaryColumn()
  id: string;

  @Column()
  rank: number;
}
