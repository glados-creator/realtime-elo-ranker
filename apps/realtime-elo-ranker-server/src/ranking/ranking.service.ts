import { Injectable, NotFoundException } from '@nestjs/common';
import { Ranking } from './ranking.interface';

@Injectable()
export class RankingService {
  private readonly rankings: Ranking[] = [];

  

}
