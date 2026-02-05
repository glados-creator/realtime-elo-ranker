import {
    Body,
    Controller,
    Post,
    ValidationPipe,
} from '@nestjs/common';
import { CreateMatchDto } from './creatematch.dto';
import { MatchService } from './match.service';
import { Match } from './match.interface';

@Controller('api/match')
export class MatchController {
    constructor(private MatchsService: MatchService) { }

    @Post()
    create(@Body(new ValidationPipe()) body: CreateMatchDto): Match {
        console.log('post match');
        // TODO : validate player exist
        // const Match = this.MatchsService.create(body);
        // TODO : update the elo
        // TODO : send SSE 
        console.log('created Match', Match);
        return Match;
    }
}
