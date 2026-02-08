import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDto } from './createplayer.dto';
import { PlayerService } from './player.service';
import { Player } from './player.interface';
import { RankingService } from '../ranking/ranking.service';

@Controller('api/player')
export class PlayerController {
  constructor(
    private playerService: PlayerService,
    private rankingService: RankingService,
  ) {}

  @Post()
  async create(@Body(new ValidationPipe()) body: CreatePlayerDto): Promise<Player> {
    const player = await this.playerService.create(body);
    // Emit SSE event so clients see the new player
    this.rankingService.notifyRankingUpdate(player.id, player.rank);
    return player;
  }

  @Get()
  async list(): Promise<Player[]> {
    return this.playerService.list();
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<Player> {
    return this.playerService.find(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ ok: boolean }> {
    await this.playerService.remove(id);
    return { ok: true };
  }
}
