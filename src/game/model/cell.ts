import { Marble } from "./marble";

export class Cell {
    private playable: boolean;
    x: number;
    y: number;
    marble?: Marble;

    constructor(x: number, y: number, playable: boolean, marbel?: Marble) {
        this.playable = playable;
        this.x = x;
        this.y = y;
        this.marble = marbel;
    }

    /** Return true no matter if the cell as a marbel or not. */
    public isPlayable(): boolean {
        return this.playable;
    }

    public hasMarble(): boolean {
        return this.marble != null;
    }

    public emptyCell(): boolean {
        return this.playable && !this.hasMarble();
    }
}