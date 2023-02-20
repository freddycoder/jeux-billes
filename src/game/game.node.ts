import { Board } from "./board";
import { PossibleMove } from "./model/possibleMove";

export class GameNode {
    constructor(board: Board, private parent?: GameNode) { 
        this.board = board;
    }

    bestScore: number = 0;
    
    board: Board;
    possibleMoves: PossibleMove[] = [];

    children: GameNode[] = [];


}