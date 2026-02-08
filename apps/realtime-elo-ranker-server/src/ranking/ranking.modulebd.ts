import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import { PlayerModuleBD } from '../player/Player.modulebd';

@Module({
  imports: [PlayerModuleBD],
  providers: [RankingService],
  controllers: [RankingController],
  exports: [RankingService],
})
export class RankingModuleBD {}
