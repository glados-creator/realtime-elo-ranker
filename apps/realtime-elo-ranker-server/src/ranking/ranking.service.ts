import { Injectable } from '@nestjs/common';
import { Ranking } from './ranking.interface';
import { Match } from '../match/match.interface';
import { PlayerService } from '../player/player.service';
import { Subject } from 'rxjs';

enum EloScore {
  win = 1,
  draw = 0.5,
  loss = 0,
}

@Injectable()
export class RankingService {
  private readonly rankingUpdates$ = new Subject<any>();
  private static readonly K = 32;
  private static readonly ELO_BIAS = 400;

  constructor(private playerService: PlayerService) {}

  /**
   * Get current ranking sorted by ELO (descending)
   */
  async getRanking(): Promise<Ranking[]> {
    const players = await this.playerService.list();
    return players
      .map((p) => ({ id: p.id, rank: p.rank }))
      .sort((a, b) => b.rank - a.rank);
  }

  /**
   * Probabilité de victoire du joueur en fonction de son classement et du classement de son adversaire
   * @param {Match} match the match 
   * @returns {number} % of winning player winning
  */
  private static getEloProbability(
    winnerRank: number,
    loserRank: number,
  ): number {
    return 1 / (1 + Math.pow(10, (winnerRank - loserRank) / this.ELO_BIAS));
  }

  /**
   * calculate le nouvelle elo d'un joueur
   * @param {String} playerid le joueur
   * @param {EloScore} coeff 1 si il a gagner 0.5 si egaliter 0 si perdu
   * @param {number} proba robabilité de victoire du joueur en fonction de son classement et du classement de son adversaire
   * @returns 
  */
  private static eloCalc(
    currentRank: number,
    score: EloScore,
    probability: number,
  ): number {
    return currentRank + this.K * (score.valueOf() - probability);
  }

  /**
   * calcule les nouveaux elo apres un match
   * @param {Match} match le match 
   */
  async processMatch(match: Match): Promise<void> {
    const winner = await this.playerService.find(match.winner);
    const loser = await this.playerService.find(match.loser);

    const probability = RankingService.getEloProbability(
      winner.rank,
      loser.rank,
    );

    if (match.draw) {
      winner.rank = RankingService.eloCalc(
        winner.rank,
        EloScore.draw,
        probability,
      );
      loser.rank = RankingService.eloCalc(
        loser.rank,
        EloScore.draw,
        1 - probability,
      );
    } else {
      winner.rank = RankingService.eloCalc(
        winner.rank,
        EloScore.win,
        probability,
      );
      loser.rank = RankingService.eloCalc(
        loser.rank,
        EloScore.loss,
        1 - probability,
      );
    }

    // notify
    this.notifyRankingUpdate(winner.id, winner.rank);
    this.notifyRankingUpdate(loser.id, loser.rank);
  }

  /**
   * Emit a ranking update via SSE
   */
  public notifyRankingUpdate(playerId: string, rank: number): void {
    this.rankingUpdates$.next({
      data: JSON.stringify({
        type: 'RankingUpdate',
        player: { id: playerId, rank },
      }),
    });
  }

  /**
   * Get observable stream of ranking updates
   */
  getRankingUpdates(): Subject<any> {
    return this.rankingUpdates$;
  }
}
