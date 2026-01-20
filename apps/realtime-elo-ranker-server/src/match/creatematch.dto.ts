import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { Player } from 'src/player/player.interface';

export class CreateMatchDto {
  @IsNotEmpty()
  readonly winner: Player;
  @IsNotEmpty()
  readonly loser: Player;
  @IsNotEmpty()
  readonly draw: boolean;
}
