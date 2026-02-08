import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateMatchDto } from './creatematch.dto';
import { MatchService } from './match.service';
import { Match } from './match.interface';

@Controller('api/match')
export class MatchController {
  constructor(private MatchService: MatchService) {}

  @Post()
  async create(@Body(new ValidationPipe()) body: CreateMatchDto): Promise<Match> {
    const match = await this.MatchService.create(body);
    return match;
  }

  @Get()
  async list(): Promise<Match[]> {
    return this.MatchService.list();
  }

  @Get(':id')
  async find(@Param('id', ParseIntPipe) id: number): Promise<Match> {
    return this.MatchService.find(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ ok: boolean }> {
    await this.MatchService.remove(id);
    return { ok: true };
  }
}
