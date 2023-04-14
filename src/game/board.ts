import { Cell } from "./model/cell";
import { Marble } from "./model/marble";

export interface ReadOnlyBoard {
    id: number;
    getGrid(): Cell[][];
    getCell(x: number, y: number): Cell;
    getMarbles(): Cell[];
    getEmptyCells(): Cell[];
}

function newCell(x: number, y: number, playable: boolean, marble: boolean = true) {
    return new Cell(x, y, playable, playable && marble ? new Marble(Math.floor(Math.random() * 1000)) : undefined)
}

export class Board implements ReadOnlyBoard {
    private static autoIncrement: number = 0

    public readonly id: number;
    public static readonly width = 7;
    public static readonly height = 7;
    public static readonly size = Board.width * Board.height;
    
    private grid: Cell[][] = [
        [newCell(0, 0, false), newCell(0, 1, false), newCell(0, 2, true), newCell(0, 3, true), newCell(0, 4, true), newCell(0, 5, false), newCell(0, 6, false)],
        [newCell(1, 0, false), newCell(1, 1, true), newCell(1, 2, true), newCell(1, 3, true), newCell(1, 4, true), newCell(1, 5, true), newCell(1, 6, false)],
        [newCell(2, 0, true), newCell(2, 1, true), newCell(2, 2, true), newCell(2, 3, true), newCell(2, 4, true), newCell(2, 5, true), newCell(2, 6, true)],
        [newCell(3, 0, true), newCell(3, 1, true), newCell(3, 2, true), newCell(3, 3, true), newCell(3, 4, true), newCell(3, 5, true), newCell(3, 6, true)],
        [newCell(4, 0, true), newCell(4, 1, true), newCell(4, 2, true), newCell(4, 3, true), newCell(4, 4, true), newCell(4, 5, true), newCell(4, 6, true)],
        [newCell(5, 0, false), newCell(5, 1, true), newCell(5, 2, true), newCell(5, 3, true), newCell(5, 4, true), newCell(5, 5, true), newCell(5, 6, false)],
        [newCell(6, 0, false), newCell(6, 1, false), newCell(6, 2, true), newCell(6, 3, true), newCell(6, 4, true), newCell(6, 5, false), newCell(6, 6, false)]
    ];
    
    constructor() {
        this.id = Board.autoIncrement++
    }
    
    public getGrid(): Cell[][] {
        return this.grid;
    }
    
    public setGrid(grid: Cell[][]): void {
        this.grid = grid;
    }
    
    public getCell(x: number, y: number): Cell {
        return this.grid[x][y];
    }
    
    public setCell(x: number, y: number, value: Cell): void {
        this.grid[x][y] = value;
    }

    public getMarbles(): Cell[] {
        let marbles: Cell[] = [];
        for (let i = 0; i < Board.width; i++) {
            for (let j = 0; j < Board.height; j++) {
                if (this.grid[i][j].hasMarble()) {
                    marbles.push(this.grid[i][j]);
                }
            }
        }
        return marbles;
    }

    public getEmptyCells(): Cell[] {
        let emptyCells: Cell[] = [];
        for (let i = 0; i < Board.width; i++) {
            for (let j = 0; j < Board.height; j++) {
                if (this.grid[i][j].emptyCell()) {
                    emptyCells.push(this.grid[i][j]);
                }
            }
        }
        return emptyCells;
    }

    public cloneBoard(): Board {
        const newBoard = new Board()
        this.getGrid().forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                newBoard.setCell(rowIndex, cellIndex, new Cell(cell.x, cell.y, cell.isPlayable(), cell.marble))
            })
        })
        return newBoard
    }
}