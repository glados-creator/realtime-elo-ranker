import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateRankingDto } from './createranking.dto';

export class UpdateRankingDto extends PartialType(CreateRankingDto) {}
