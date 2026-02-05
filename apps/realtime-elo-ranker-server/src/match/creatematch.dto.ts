import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateMatchDto {
  @IsNotEmpty()
  @IsString()
  readonly winner: String;
  @IsNotEmpty()
  @IsString()
  readonly loser: String;
  @IsNotEmpty()
  @IsBoolean()
  readonly draw: boolean;
}
