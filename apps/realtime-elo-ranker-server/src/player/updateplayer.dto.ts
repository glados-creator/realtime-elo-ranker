import { OmitType, PartialType } from '@nestjs/swagger';
import {CreatePlayerDto } from './createplayer.dto';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {}
