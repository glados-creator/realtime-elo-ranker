import { Injectable, NotFoundException } from '@nestjs/common';
import { Player } from './player.interface';
import { CreatePlayerDto } from './createplayer.dto';

@Injectable()
export class PlayerService {
  private readonly players: Player[] = [];
  private idCounter = 1;

  public create(player: CreatePlayerDto): Player {
    console.log('service create');

    const newPlayer: Player = {
      id: String(player.id || this.idCounter++), // TODO : to uuid
      rank: 400 // player.rank,
    };
    this.players.push(newPlayer);
    return newPlayer;
  }

  public find(id : String) : Player{
    return this.players[0];
  }
}
