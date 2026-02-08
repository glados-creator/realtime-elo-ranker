import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchEnt } from './match.entity';
import { MatchService } from './match.service';
import { PlayerModuleBD } from '../player/Player.modulebd';
import { RankingModuleBD } from '../ranking/ranking.modulebd';

@Module({
  imports: [TypeOrmModule.forFeature([MatchEnt]), PlayerModuleBD, RankingModuleBD],
  providers: [MatchService],
  exports: [TypeOrmModule, MatchService],
})
export class MatchModuleBD {}
