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

@Controller('api/player')
export class PlayerController {
  constructor(
    private playerService: PlayerService,
  ) {}

  @Post()
  async create(@Body(new ValidationPipe()) body: CreatePlayerDto): Promise<Player> {
    const player = await this.playerService.create(body);
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
