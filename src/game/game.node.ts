import { Board } from "./board";
import { GameResolver } from "./game.resolver";
import { Cell } from "./model/cell";
import { PossibleMove } from "./model/possibleMove";

export interface PossibleMoveData {
    move: PossibleMove;
    score?: number;
}

export class GameNode {
    constructor(public board: Board, public parent?: GameNode, public move?: PossibleMoveData) {
        const possibleModes = GameResolver.getPossibleMoves(board)
        possibleModes.forEach(move => this.possibleMoveData.push({ move }))
        this.move = move
    }

    possibleMoveData: PossibleMoveData[] = [];
    bestScore: number = 0;
    children: GameNode[] = [];

    getRandomMove(): PossibleMoveData {
       const unusedMove = this.possibleMoveData.filter(m => m.score === undefined);
       return unusedMove[Math.floor(Math.random() * unusedMove.length)];
    }

    hasUntriedMove(): boolean {
        return this.possibleMoveData.filter(m => m.score === undefined).length > 0
    }

    playTurn(): PlayTurnResponse {
        const newBoard = this.board.cloneBoard();

        // get a random possible move
        const randomMove = this.getRandomMove();
        const { emptyCell, cellWithMarble } = randomMove.move;

        // console.log("play move " + JSON.stringify(randomMove))

        // update the board with the new move
        newBoard.getCell(emptyCell.x, emptyCell.y).marble = cellWithMarble.marble;
        newBoard.getCell(cellWithMarble.x, cellWithMarble.y).marble = undefined;

        // get the position of the marble to remove
        const position = getMarbleToRemovePosition(cellWithMarble, emptyCell);

        const cellToRemoveMarble = newBoard.getCell(position[0], position[1]);
        if (cellToRemoveMarble.hasMarble() === false) {
            throw new Error('OnPlayTurn - cellToRemoveMarble muste have a marble');
        }
        cellToRemoveMarble.marble = undefined;

        return {
            newBoard: newBoard,
            moveReference: randomMove
        }
    }
}

function getMarbleToRemovePosition(cell1: Cell, cell2: Cell): number[] {
    const x = (cell1.x + cell2.x) / 2
    const y = (cell1.y + cell2.y) / 2

    return [x, y]
}

interface PlayTurnResponse {
    newBoard: Board
    moveReference: PossibleMoveData
}