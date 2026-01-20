import { Injectable, NotFoundException } from '@nestjs/common';
import { Match } from './match.interface';
import { CreateMatchDto } from './creatematch.dto';

@Injectable()
export class MatchService {
    private readonly matchs: Match[] = [];
    private idCounter = 1;

    create(match: CreateMatchDto): Match {
        console.log('service create');

        const newMatch: Match = {
            id: this.idCounter++,
            winner: match.winner,
            loser: match.loser,
            draw: match.draw,
        };
        this.matchs.push(newMatch);
        return newMatch;
    }

    findAll(): Match[] {
        console.log('service findall');
        return this.matchs;
    }

    findone(id: number): Match {
        console.log('service findone');
        const match = this.matchs.find((match) => match.id == id);
        if (match) {
            return match;
        } else {
            throw new NotFoundException(`match with id ${id} not found`);
        }
    }

    update(id: number, update: Partial<CreateMatchDto>): Match {
        console.log('service update');
        const match = this.findone(id);
        Object.assign(match, update);
        return match;
    }

    delete(id: number): Match {
        console.log('service delete');
        const match = this.findone(id);
        const index = this.matchs.indexOf(match);
        this.matchs.slice(index, 1);
        return match;
    }
}
