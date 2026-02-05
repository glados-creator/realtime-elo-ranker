import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import { PlayerEnt } from '../player/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerEnt])],
  providers: [RankingService],
  controllers: [RankingController],
  exports: [RankingService]
})
export class RankingsModule { }
