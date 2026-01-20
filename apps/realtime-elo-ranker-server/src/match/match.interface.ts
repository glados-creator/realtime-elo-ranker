import { Player } from "src/player/player.interface";

export class Match {
    id: Number;
    winner: Player;
    loser: Player;
    draw: boolean;
}
