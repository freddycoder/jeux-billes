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
            {cell.isPlayable() ? cell.marble?.getId() : ''}
        </div>
    )
}

export default CellComponent;