import { Injectable, NotFoundException } from '@nestjs/common';
import { Ranking } from './ranking.interface';
import { CreateRankingDto } from './createranking.dto';

@Injectable()
export class RankingService {
  private readonly rankings: Ranking[] = [];
  private idCounter = 1;

  create(rank: CreateRankingDto): Ranking {
    console.log('service create');

    const newRanking: Ranking = {
      id: String(this.idCounter++),
      rank: rank.rank,
    };
    this.rankings.push(newRanking);
    return newRanking;
  }

  findAll(): Ranking[] {
    console.log('service findall');
    return this.rankings;
  }

  findone(id: String): Ranking {
    console.log('service findone');
    const rank = this.rankings.find((rank) => rank.id == id);
    if (rank) {
      return rank;
    } else {
      throw new NotFoundException(`rank with id ${id} not found`);
    }
  }

  update(id: String, update: Partial<CreateRankingDto>): Ranking {
    console.log('service update');
    const rank = this.findone(id);
    Object.assign(rank, update);
    return rank;
  }

  delete(id: String): Ranking {
    console.log('service delete');
    const rank = this.findone(id);
    const index = this.rankings.indexOf(rank);
    this.rankings.slice(index, 1);
    return rank;
  }
}
