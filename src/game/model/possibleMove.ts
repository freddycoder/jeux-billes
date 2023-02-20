import { Cell } from "./cell";

export interface PossibleMove {
    cellWithMarble: Cell;
    emptyCell: Cell;
}