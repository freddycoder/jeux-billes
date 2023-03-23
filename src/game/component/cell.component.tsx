import { Cell } from "../model/cell";
import { PossibleMove } from "../model/possibleMove";

interface CellComponentProps {
    cellIndex: number;
    cell: Cell;
    possibleMoves: PossibleMove[];
}

function CellComponent({ cellIndex, cell, possibleMoves }: CellComponentProps) {

    function getBackgroundColor(cell: Cell, possibleMoves: PossibleMove[]) {
        if (!cell.isPlayable()) {
            return undefined;
        }

        return possibleMoves.find(move => move.cellWithMarble.x === cell.x && move.cellWithMarble.y === cell.y) ? 'green' : 'grey'
    }

    return (
        <div className="cell" key={cellIndex} style={{
            backgroundColor: getBackgroundColor(cell, possibleMoves)
        }}>
            {cell.isPlayable() ? 
                <div 
                    className="marbel" 
                    style={{backgroundColor: getMarbleBackgroundColor(cell.marble?.getId())}}></div> :
                ''}
        </div>
    )
}

function getMarbleBackgroundColor(number?: number) {
    if (!number) return undefined
    const hue = Math.round((number / 1000) * 360);
    return `hsl(${hue}, 60%, 50%)`;
  }

export default CellComponent;