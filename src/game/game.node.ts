import { Board } from "./board";
import { GameResolver } from "./game.resolver";
import { Cell } from "./model/cell";
import { PossibleMove } from "./model/possibleMove";

export interface PossibleMoveData {
    move: PossibleMove;
    score?: number;
}

export class GameNode {
    constructor(board: Board, parent?: GameNode, move?: PossibleMoveData) {
        const possibleModes = GameResolver.getPossibleMoves(board)
        this.possibleMoveData = []
        possibleModes.forEach(move => this.possibleMoveData?.push({ move }))
        this.board = board
        this.parent = parent
        this.move = move
    }

    board?: Board;
    parent?: GameNode;
    move?: PossibleMoveData;
    possibleMoveData?: PossibleMoveData[];
    bestScore: number = 0;
    children?: GameNode[] = [];

    getRandomMove(): PossibleMoveData {
        if (this.possibleMoveData == null) {
            throw new Error("Member possibleMoveData is null wen caling getRandomMove on board " + this.board?.id)
        }
       const unusedMove = this.possibleMoveData.filter(m => m.score === undefined);
       return unusedMove[Math.floor(Math.random() * unusedMove.length)];
    }

    getMove(source: Cell, destination: Cell) {
        if (this.possibleMoveData == null) {
            throw new Error("Member possibleMoveData is null wen caling getMove on board " + this.board?.id)
        }
        return this.possibleMoveData.find(m => 
                m.move.cellWithMarble.x == source.x && m.move.cellWithMarble.y == source.y &&
                m.move.emptyCell.x == destination.x && m.move.emptyCell.y == destination.y);
    }

    hasUntriedMove(caller?: string): boolean {
        if (this.possibleMoveData == null) {
            throw new Error("Member possibleMoveData is null wen caling hasUntriedMove on board " + this.board?.id + ". Caller " + caller)
        }
        return this.possibleMoveData.filter(m => m.score === undefined).length > 0
    }

    playRandomTurn(): PlayTurnResponse {
        if (this.board == null) {
            throw new ReferenceError("Member bord is null when caling playRandomTurn on board")
        }

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

    playTurn(source: Cell, destination: Cell): PlayTurnResponse {
        if (this.board == null) {
            throw new ReferenceError("Member bord is null when caling playTurn on board")
        }

        const newBoard = this.board.cloneBoard();

        // get a random possible move
        const move = this.getMove(source, destination);
        if (move == null) {
            throw new Error("Unplayable move selected...")
        }
        const { emptyCell, cellWithMarble } = move.move;

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
            moveReference: move
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