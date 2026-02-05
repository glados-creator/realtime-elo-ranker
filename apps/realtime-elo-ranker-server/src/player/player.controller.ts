import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDto } from './createplayer.dto';
import { PlayerService } from './player.service';
import { Player } from './player.interface';

@Controller('api/player')
export class PlayerController {
  constructor(private PlayerService: PlayerService) {}

  @Post()
  create(@Body(new ValidationPipe()) body: CreatePlayerDto): Player {
    console.log('create');
    const player = this.PlayerService.create(body);
    console.log('created player', player);
    return player;
  }
}
