import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;
  @IsNotEmpty()
  @Min(0)
  readonly rank: number;
}
