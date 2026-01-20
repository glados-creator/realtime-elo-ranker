import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchController } from './match/match.controller';
import { PlayerController } from './player/player.controller';

@Module({
  imports: [],
  controllers: [AppController, MatchController, PlayerController],
  providers: [AppService],
})
export class AppModule {}
