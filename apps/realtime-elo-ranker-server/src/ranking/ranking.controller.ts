import {
  Controller,
  Get,
  Sse,
} from '@nestjs/common';
import { RankingService } from './ranking.service';
import { Ranking } from './ranking.interface';
import { Observable } from 'rxjs';

@Controller('api/ranking')
export class RankingController {
  constructor(private rankingsService: RankingService) {}

  @Get('ranking')
  getRanking(): Ranking[] {
  }

  @Sse('ranking/events') // L'URL sera http://localhost:8888/api/ranking/events
    sse(): Observable<any> {
        return this.rankingsService.getRankingUpdates();
    }
}
