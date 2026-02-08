import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Match } from './match.interface';
import { CreateMatchDto } from './creatematch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchEnt } from './match.entity';
import { PlayerService } from '../player/player.service';
import { RankingService } from '../ranking/ranking.service';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(MatchEnt)
    private readonly repo: Repository<MatchEnt>,
    private readonly playerService: PlayerService,
    private readonly rankingService: RankingService,
  ) {}

  async create(match: CreateMatchDto): Promise<Match> {
    // Validate both players exist
    await this.playerService.find(match.winner);
    await this.playerService.find(match.loser);

    const ent = this.repo.create({
      winner: { id: match.winner },
      loser: { id: match.loser },
      draw: match.draw,
    });
    const saved = await this.repo.save(ent);

    const result = {
      winner: saved.winner.id,
      loser: saved.loser.id,
      draw: saved.draw,
    };

    // Process ELO update and emit ranking events
    await this.rankingService.processMatch(result);

    return result;
  }

  async find(id: number): Promise<Match> {
    const ent = await this.repo.findOneBy({ id });
    if (!ent) throw new NotFoundException('Match not found');
    return {
      winner: ent.winner.id,
      loser: ent.loser.id,
      draw: ent.draw,
    };
  }

  async list(): Promise<Match[]> {
    const all = await this.repo.find();
    return all.map((e) => ({
      winner: e.winner.id,
      loser: e.loser.id,
      draw: e.draw,
    }));
  }

  async remove(id: number): Promise<void> {
    const ent = await this.repo.findOneBy({ id });
    if (!ent) throw new NotFoundException('Match not found');
    await this.repo.delete({ id });
  }
}
