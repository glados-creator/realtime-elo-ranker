import { Injectable, NotFoundException } from '@nestjs/common';
import { Player } from './player.interface';
import { CreatePlayerDto } from './createplayer.dto';

@Injectable()
export class PlayerService {
  private readonly players: Player[] = [];
  private idCounter = 1;

  create(player: CreatePlayerDto): Player {
    console.log('service create');

    const newPlayer: Player = {
      id: String(player.id || this.idCounter++), // TODO : to uuid
      rank: 400 // player.rank,
    };
    this.players.push(newPlayer);
    return newPlayer;
  }

  findAll(): Player[] {
    console.log('service findall');
    return this.players;
  }

  findone(id: number): Player {
    console.log('service findone');
    const player = this.players.find((player) => player.id == String(id)); // TODO : to uuid
    if (player) {
      return player;
    } else {
      throw new NotFoundException(`player with id ${id} not found`);
    }
  }

  update(id: number, update: Partial<CreatePlayerDto>): Player {
    console.log('service update');
    const player = this.findone(id);
    Object.assign(player, update);
    return player;
  }

  delete(id: number): Player {
    console.log('service delete');
    const player = this.findone(id);
    const index = this.players.indexOf(player);
    this.players.slice(index, 1);
    return player;
  }
}
