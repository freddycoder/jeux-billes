import { playTurn } from "../func/game.func";
import { GameNode } from "../game.node";
import { Cell } from "../model/cell";
import { PossibleMove } from "../model/possibleMove";

interface CellComponentProps {
    cellIndex: number;
    cell: Cell;
    possibleMoves: PossibleMove[];
    selectedCell?: Cell;
    setSelectedCell: Function;
    gameNode: GameNode;
    setGameNode: Function;
}

function CellComponent({ cellIndex, cell, possibleMoves, selectedCell, setSelectedCell, gameNode, setGameNode }: CellComponentProps) {
    return (
        <div 
            key={cellIndex} 
            className="cell" 
            onClick={() => onCellClick(gameNode, setGameNode, cell, possibleMoves, setSelectedCell, selectedCell)}
            style={{
                backgroundColor: getBackgroundColor(cell, possibleMoves),
                border: getBorder(cell, selectedCell)
            }}
        >
            {cell.isPlayable() ? 
                <div
                    className="marbel" 
                    style={{backgroundColor: getMarbleBackgroundColor(cell.marble?.getId())}}></div> :
                ''}
        </div>
    )
}

function isPossibleMove(cell: Cell, possibleMoves: PossibleMove[]) {
    if (!cell.isPlayable()) {
        return undefined;
    }

    return possibleMoves.find(move => move.cellWithMarble.x === cell.x && move.cellWithMarble.y === cell.y) ? true : false
}

function getBackgroundColor(cell: Cell, possibleMoves: PossibleMove[]) {
    const possible = isPossibleMove(cell, possibleMoves)
    
    if (possible === undefined) {
        return undefined
    }

    return possible ? 'green' : 'grey'
}

function onCellClick(gameNode: GameNode, setGameNode: Function, cell: Cell, possibleMoves: PossibleMove[], setSelectedCell: Function, selectedCell?: Cell) {
    if (isPossibleMove(cell, possibleMoves)) {
        setSelectedCell(cell)
    }
    else if (cell.emptyCell() && selectedCell) {
        const newGameNode = playTurn(gameNode, selectedCell, cell)
        setSelectedCell(undefined)
        setGameNode(newGameNode)
    }
}

function getMarbleBackgroundColor(number?: number) {
    if (!number) return undefined
    const hue = Math.round((number / 1000) * 360);
    return `hsl(${hue}, 60%, 50%)`;
}

function getBorder(cell: Cell, selectedCell?: Cell) {
    if (cell.x == selectedCell?.x && cell.y == selectedCell?.y) {
        return "1px solid white"
    }
    return undefined
}

export default CellComponent;