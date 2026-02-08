import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateMatchDto {
  @IsNotEmpty()
  @IsString()
  readonly winner: string;
  @IsNotEmpty()
  @IsString()
  readonly loser: string;
  @IsNotEmpty()
  @IsBoolean()
  readonly draw: boolean;
}
