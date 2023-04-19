import { playTurn, removeMarble } from "../func/game.func";
import { GameNode } from "../game.node";
import { Cell } from "../model/cell";
import { PossibleMove } from "../model/possibleMove";
import { MarbleComponent } from "./marble.component";

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
                backgroundColor: getCellBackgroundColor(gameNode, cell, possibleMoves),
                border: getBorder(cell, selectedCell)
            }}
        >
            {cell.isPlayable() ? 
                <MarbleComponent cell={cell} /> :
                ''}
        </div>
    )
}

function isPossibleMove(cell: Cell, possibleMoves?: PossibleMove[]) {
    if (!cell.isPlayable() || possibleMoves == null) {
        return undefined;
    }

    return possibleMoves.find(move => move.cellWithMarble.x === cell.x && move.cellWithMarble.y === cell.y) ? true : false
}

function letteredGreen(cell: Cell) {
    return cell.letter === 'A' ? '#02bd15' : (cell.letter === "B" ? '#007a0c' : (cell.letter === "C" ? '#0ee323' : 'white'))
}

function letteredGrey(cell: Cell) {
    return cell.letter === 'A' ? 'rgb(90, 90, 90)' : (cell.letter === "B" ? '#787878' : (cell.letter === "C" ? '#474747' : 'white'))
}

function getCellBackgroundColor(gameNode: GameNode, cell: Cell, possibleMoves: PossibleMove[]) {
    if (gameNode.board?.id === 0 && cell.isPlayable()) {
        if (
            ((cell.x == 0 || cell.x == 6) && (cell.y == 2 || cell.y == 4)) ||
            ((cell.x == 1 || cell.x == 5) && (cell.y == 3)) ||
            ((cell.x == 2 || cell.x == 4) && (cell.y == 0 || cell.y == 3 || cell.y == 6)) ||
            (cell.x == 3 && (cell.y == 1 || cell.y == 2 || cell.y == 4 || cell.y == 5))
        ) {
            return letteredGreen(cell)
        }
        return letteredGrey(cell)
    }

    const possible = isPossibleMove(cell, possibleMoves)
    
    if (possible === undefined) {
        return undefined
    }

    return possible ? 
        letteredGreen(cell) : 
        letteredGrey(cell)
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
    else if (gameNode.board?.id === 0 && cell != null) {
        const newGameNode = removeMarble(gameNode, cell)
        setGameNode(newGameNode)
    }
    else {
        console.log("Nothing to do, " + gameNode.board?.id)
    }
}  

function getBorder(cell: Cell, selectedCell?: Cell) {
    if (cell.x == selectedCell?.x && cell.y == selectedCell?.y) {
        return "1px solid white"
    }
    return undefined
}

export default CellComponent;