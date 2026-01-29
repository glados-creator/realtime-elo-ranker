import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEnt } from './player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerEnt])],
  exports: [TypeOrmModule],
})
export class PlayerModuleBD {}
