import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchController } from './match/match.controller';
import { PlayerController } from './player/player.controller';
import { RankingController } from './ranking/ranking.controller';

@Module({
  imports: [],
  controllers: [AppController, MatchController, PlayerController, RankingController],
  providers: [AppService],
})
export class AppModule {}
