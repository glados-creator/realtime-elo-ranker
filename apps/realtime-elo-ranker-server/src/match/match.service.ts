import { Injectable, NotFoundException } from '@nestjs/common';
import { Match } from './match.interface';
import { CreateMatchDto } from './creatematch.dto';

@Injectable()
export class MatchService {
    private readonly matchs: Match[] = [];

    create(match: CreateMatchDto): Match {
        console.log('service create');

        const newMatch: Match = {
            winner: match.winner,
            loser: match.loser,
            draw: match.draw,
        };
        this.matchs.push(newMatch);
        return newMatch;
    }
}
