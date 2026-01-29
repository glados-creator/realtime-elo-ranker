import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    ValidationPipe,
} from '@nestjs/common';
import { CreateMatchDto } from './creatematch.dto';
import { MatchService } from './match.service';
import { Match } from './match.interface';

@Controller('api/match')
export class MatchController {
    constructor(private MatchsService: MatchService) { }

    @Get()
    findAll(): Match[] {
        console.log('findall');
        return this.MatchsService.findAll();
    }

    @Get('query')
    findAllQuery(@Param('age') age: number, @Param('name') name: string): string {
        console.log('findAllQuery');
        return 'string';
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id: any): Match {
        console.log('findOne');
        return this.MatchsService.findone(id);
    }

    @Get(':id/:other')
    findOneWith(@Param('id') params: any): string {
        console.log('findOneWith');
        console.log(params.id);
        return `This action returns OTHER the Match with id ${params.id} with ${params.other}`;
    }

    @Post()
    create(@Body(new ValidationPipe()) body: CreateMatchDto): Match {
        console.log('create');
        const Match = this.MatchsService.create(body);
        console.log('created Match', Match);
        return Match;
    }

    @Put(':id')
    update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body(new ValidationPipe()) body: CreateMatchDto,
    ): Match {
        console.log('update');
        return this.MatchsService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id', new ParseIntPipe()) id: number): Match {
        console.log('remove');
        return this.MatchsService.delete(id);
    }
}
