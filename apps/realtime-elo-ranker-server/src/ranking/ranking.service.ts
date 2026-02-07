import { Injectable, NotFoundException } from '@nestjs/common';
import { Ranking } from './ranking.interface';
import { Match } from '../match/match.interface';
import { PlayerService } from '../player/player.service';
import { Player } from 'src/player/player.interface';

enum EloScore {
  win = 1,
  draw = 0.5,
  loss = 0
}

@Injectable()
export class RankingService {
  constructor(private PlayerService_inst: PlayerService) { }
  private readonly rankings: Ranking[] = [];

  private static readonly K = 32;
  private static readonly ELO_BIAS = 400;

  /**
   * Probabilité de victoire du joueur en fonction de son classement et du classement de son adversaire
   * @param {Match} match the match 
   * @returns {number} % of winning player winning
  */
  private static getEloProbabilite(match: Match): number {
    let RankPosWin: number  = this.PlayerService_inst.find(match.winner).rank;
    let RankPosLoss: number = this.PlayerService_inst.find(match.loser ).rank;
    return 1 / (1 + Math.pow(10, (RankPosWin - RankPosLoss) / this.ELO_BIAS));
  }

  /**
   * calculate le nouvelle elo d'un joueur
   * @param {String} playerid le joueur
   * @param {EloScore} coeff 1 si il a gagner 0.5 si egaliter 0 si perdu
   * @param {number} proba robabilité de victoire du joueur en fonction de son classement et du classement de son adversaire
   * @returns 
  */
  private static EloCalc(playerid: String, coeff: EloScore, proba: number): void {
    let play : Player = this.PlayerService_inst.find(playerid) 
    let elo = play.rank + this.K * (coeff.valueOf() - proba);
    play.rank = elo; // TODO : sync db ?
  }
  /**
   * calcule les nouveaux elo apres un match
   * @param {Match} match le match 
   */
  public EloCalculate(match: Match): void {
    let eloproba        = RankingService.getEloProbabilite(match);
    if (match.draw) {
      RankingService.EloCalc(match.winner, EloScore.draw, eloproba);
      RankingService.EloCalc(match.winner, EloScore.draw, 1 - eloproba);
    } else {
      RankingService.EloCalc(match.winner, EloScore.win, eloproba);
      RankingService.EloCalc(match.winner, EloScore.loss, 1 - eloproba);
    }
    this.notifyAll();
  }

  public addListener(){
    ;
  }

  public notifyAll(){

  }

}
