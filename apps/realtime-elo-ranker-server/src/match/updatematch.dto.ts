import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateMatchDto } from './creatematch.dto';

export class UpdateMatchDto extends PartialType(CreateMatchDto) {}
