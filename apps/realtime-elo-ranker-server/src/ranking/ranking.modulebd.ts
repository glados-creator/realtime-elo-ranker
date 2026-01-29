import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankingEnt } from './ranking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RankingEnt])],
  exports: [TypeOrmModule],
})
export class RankingModuleBD {}
