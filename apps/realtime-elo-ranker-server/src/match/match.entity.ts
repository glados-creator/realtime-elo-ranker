import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { PlayerEnt } from 'src/player/player.entity';
import { Player } from 'src/player/player.interface';

@Entity()
export class MatchEnt {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PlayerEnt, { eager: true })
  winner: PlayerEnt;

  @ManyToOne(() => PlayerEnt, { eager: true })
  loser: PlayerEnt;

  @Column()
  draw: boolean;
}
