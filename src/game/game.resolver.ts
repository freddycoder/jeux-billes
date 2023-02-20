import { Board } from "./board";
import { Cell } from "./model/cell";
import { PossibleMove } from "./model/possibleMove";

export class GameResolver {
    public static getPossibleMoves(board: Board): PossibleMove[] {
        // Possible moves are when a marble is next to another marble that is next to an empty space

        // Get all marbles
        let marbles = board.getMarbles();

        // Get all empty cells
        let emptyCells = board.getEmptyCells();

        // Get all possible moves
        let possibleMoves: PossibleMove[] = [];
        for (let i = 0; i < marbles.length; i++) {
            for (let j = 0; j < emptyCells.length; j++) {
                if (this.canMoveTo(board, marbles[i], emptyCells[j])) {
                    possibleMoves.push({ 
                        cellWithMarble: marbles[i], 
                        emptyCell: emptyCells[j]
                    });
                }
            }
        }

        return possibleMoves;
    }

    private static canMoveTo(board: Board, cellWithMarble: Cell, cellWithoutMarbel: Cell): boolean {
        if (cellWithMarble.hasMarble() === false) {
            throw new Error('canMoveTo - cellWithMarble must have a marble');
        }
        if (cellWithoutMarbel.hasMarble() === true) {
            throw new Error('canMoveTo - cellWithoutMarble must not have a marble')
        }

        const probablyAChoice = (cellWithMarble.x === cellWithoutMarbel.x && Math.abs(cellWithMarble.y - cellWithoutMarbel.y) === 2) || 
                                (cellWithMarble.y === cellWithoutMarbel.y && Math.abs(cellWithMarble.x - cellWithoutMarbel.x) === 2);

        if (probablyAChoice) {
            const pos = getMarbleToRemovePosition(cellWithMarble, cellWithoutMarbel);

            const midCell = board.getCell(pos[0], pos[1])

            return midCell.hasMarble()
        }

        return false;
    }
}

function getMarbleToRemovePosition(cell1: Cell, cell2: Cell): number[] {
    const x = (cell1.x + cell2.x) / 2
    const y = (cell1.y + cell2.y) / 2

    return [x, y]
}