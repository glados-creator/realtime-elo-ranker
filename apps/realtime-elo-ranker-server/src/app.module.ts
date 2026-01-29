import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MatchController } from './match/match.controller';
import { MatchService } from './match/match.service';
import { MatchModuleBD } from './match/match.modulebd';
import { MatchEnt } from './match/match.entity';

import { PlayerController } from './player/player.controller';
import { PlayerService } from './player/player.service';
import { PlayerModuleBD } from './player/Player.modulebd';
import { PlayerEnt } from './player/player.entity';

import { RankingController } from './ranking/ranking.controller';
import { RankingService } from './ranking/ranking.service';
import { RankingModuleBD } from './ranking/ranking.modulebd';
import { RankingEnt } from './ranking/ranking.entity';

@Module({
  imports: [MatchModuleBD,PlayerModuleBD,RankingModuleBD,TypeOrmModule.forRoot({
      type: 'sqlite',
      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: 'root',
      database: join(__dirname, '..', 'database.sqlite'), // Creates in project root
      entities: [MatchEnt,PlayerEnt,RankingEnt],
      // entities: [__dirname + '/**/*.entity.ts'],
      synchronize: true, // pour dev
    }),],
  controllers: [AppController, MatchController, PlayerController, RankingController],
  providers: [AppService,MatchService,PlayerService,RankingService],
})
export class AppModule {}
