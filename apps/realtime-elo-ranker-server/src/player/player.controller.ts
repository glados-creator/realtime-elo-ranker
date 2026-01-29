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

  @Get()
  findAll(): Player[] {
    console.log('findall');
    return this.PlayerService.findAll();
  }

  @Get('query')
  findAllQuery(@Param('age') age: number, @Param('name') name: string): string {
    console.log('findAllQuery');
    return 'string';
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: any): Player {
    console.log('findOne');
    return this.PlayerService.findone(id);
  }

  @Get(':id/:other')
  findOneWith(@Param('id') params: any): string {
    console.log('findOneWith');
    console.log(params.id);
    return `This action returns OTHER the player with id ${params.id} with ${params.other}`;
  }

  @Post()
  create(@Body(new ValidationPipe()) body: CreatePlayerDto): Player {
    console.log('create');
    const player = this.PlayerService.create(body);
    console.log('created player', player);
    return player;
  }

  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body(new ValidationPipe()) body: CreatePlayerDto,
  ): Player {
    console.log('update');
    return this.PlayerService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number): Player {
    console.log('remove');
    return this.PlayerService.delete(id);
  }
}
