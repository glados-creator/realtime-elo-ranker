import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchController } from './match/match.controller';

@Module({
  imports: [],
  controllers: [AppController, MatchController],
  providers: [AppService],
})
export class AppModule {}
