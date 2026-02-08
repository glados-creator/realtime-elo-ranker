import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Player } from './player.interface';
import { CreatePlayerDto } from './createplayer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerEnt } from './player.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(PlayerEnt)
    private readonly repo: Repository<PlayerEnt>,
  ) {}

  public async create(player: CreatePlayerDto): Promise<Player> {
    const existing = await this.repo.findOneBy({ id: player.id });
    if (existing) {
      throw new ConflictException('Player already exists');
    }

    // calcule le rank avec la moyenne des joueurs existants, ou 400 si il y a personne
    const allPlayers = await this.repo.find();
    let initialRank = 400;
    if (allPlayers.length > 0) {
      const sumRanks = allPlayers.reduce((sum, p) => sum + p.rank, 0);
      initialRank = sumRanks / allPlayers.length;
    }

    const ent = this.repo.create({ id: player.id, rank: initialRank });
    const saved = await this.repo.save(ent);
    return { id: saved.id, rank: saved.rank } as Player;
  }

  public async find(id: string): Promise<Player> {
    const ent = await this.repo.findOneBy({ id });
    if (!ent) throw new NotFoundException('Player not found');
    return { id: ent.id, rank: ent.rank } as Player;
  }

  public async list(): Promise<Player[]> {
    const all = await this.repo.find();
    return all.map((e) => ({ id: e.id, rank: e.rank }));
  }

  public async remove(id: string): Promise<void> {
    const ent = await this.repo.findOneBy({ id });
    if (!ent) throw new NotFoundException('Player not found');
    await this.repo.delete({ id });
  }

  public async updateRank(id: string, rank: number): Promise<Player> {
    const ent = await this.repo.findOneBy({ id });
    if (!ent) throw new NotFoundException('Player not found');
    ent.rank = rank;
    const saved = await this.repo.save(ent);
    return { id: saved.id, rank: saved.rank } as Player;
  }
}
