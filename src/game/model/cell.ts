import { Marble } from "./marble";

export class Cell {
    playable: boolean;
    x: number;
    y: number;
    marble?: Marble;

    constructor(x: number, y: number, playable: boolean, marbel?: Marble) {
        this.playable = playable;
        this.x = x;
        this.y = y;
        this.marble = marbel;
    }

    public isPlayable(): boolean {
        return this.playable;
    }

    public hasMarble(): boolean {
        return this.marble !== undefined;
    }

    public emptyCell(): boolean {
        return this.playable && !this.hasMarble();
    }
}