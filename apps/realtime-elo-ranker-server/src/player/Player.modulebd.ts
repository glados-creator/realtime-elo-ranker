import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEnt } from './player.entity';
import { PlayerService } from './player.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerEnt])],
  providers: [PlayerService],
  exports: [TypeOrmModule, PlayerService],
})
export class PlayerModuleBD {}
