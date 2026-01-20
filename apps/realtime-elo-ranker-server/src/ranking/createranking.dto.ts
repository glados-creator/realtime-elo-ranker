import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateRankingDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;
  @IsInt()
  @Min(0)
  readonly rank: number;
}
