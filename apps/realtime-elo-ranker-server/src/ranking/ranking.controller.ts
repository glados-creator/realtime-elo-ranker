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
import { CreateRankingDto } from './createranking.dto';
import { RankingService } from './ranking.service';
import { Ranking } from './ranking.interface';

@Controller('api/ranking')
export class RankingController {
  constructor(private rankingsService: RankingService) {}

  @Get()
  findAll(): Ranking[] {
    console.log('findall');
    return this.rankingsService.findAll();
  }

  @Get('query')
  findAllQuery(@Param('age') age: number, @Param('name') name: string): string {
    console.log('findAllQuery');
    return 'string';
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: any): Ranking {
    console.log('findOne');
    return this.rankingsService.findone(id);
  }

  @Get(':id/:other')
  findOneWith(@Param('id') params: any): string {
    console.log('findOneWith');
    console.log(params.id);
    return `This action returns OTHER the ranking with id ${params.id} with ${params.other}`;
  }

  @Post()
  create(@Body(new ValidationPipe()) body: CreateRankingDto): Ranking {
    console.log('create');
    const ranking = this.rankingsService.create(body);
    console.log('created ranking', ranking);
    return ranking;
  }

  @Put(':id')
  update(
    @Param('id') id: String,
    @Body(new ValidationPipe()) body: CreateRankingDto,
  ): Ranking {
    console.log('update');
    return this.rankingsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: String): Ranking {
    console.log('remove');
    return this.rankingsService.delete(id);
  }
}
