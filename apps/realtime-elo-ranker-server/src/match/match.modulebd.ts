import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchEnt } from './match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MatchEnt])],
  exports: [TypeOrmModule],
})
export class MatchModuleBD {}
