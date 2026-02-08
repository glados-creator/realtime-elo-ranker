import {
  Controller,
  Get,
  NotFoundException,
  Sse,
} from '@nestjs/common';
import { RankingService } from './ranking.service';
import { Ranking } from './ranking.interface';
import { Observable } from 'rxjs';

@Controller('api/ranking')
export class RankingController {
  constructor(private rankingService: RankingService) {}

  @Get()
  async getRanking(): Promise<Ranking[]> {
    const ranking = await this.rankingService.getRanking();
    if (ranking.length === 0) {
      throw new NotFoundException('No players available for ranking');
    }
    return ranking;
  }

  @Sse('events')
  sse(): Observable<any> {
    return this.rankingService.getRankingUpdates();
  }
}
