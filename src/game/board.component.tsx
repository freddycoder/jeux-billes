import { useState } from "react"
import { Board } from "./board"
import { GameResolver } from "./game.resolver"
import { Cell } from "./model/cell"
import CellComponent from "./component/cell.component"

function BoardComponent() {
    const [board, setBoard] = useState(new Board())

    // get the list of possible moves
    const possibleMoves = GameResolver.getPossibleMoves(board)

    function cloneBoard(board: Board): Board {
        const newBoard = new Board()
        board.getGrid().forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                newBoard.setCell(rowIndex, cellIndex, new Cell(cell.x, cell.y, cell.isPlayable(), cell.marble))
            })
        })
        return newBoard
    }

    return (
        <div className="board">
            {
                board.getGrid().map((row, rowIndex) => {
                    return (
                        <div className="row" key={rowIndex}>
                            {
                                row.map((cell, cellIndex) => {
                                    return (
                                        <CellComponent key={cellIndex} cellIndex={cellIndex} cell={cell} possibleMoves={possibleMoves} /> 
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
            <button onClick={() => {
                console.log("play turn")
                // get a random possible move
                const { emptyCell, cellWithMarble } = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]

                // update the board with the new move
                board.getCell(emptyCell.x, emptyCell.y).marble = cellWithMarble.marble
                board.getCell(cellWithMarble.x, cellWithMarble.y).marble = undefined

                // get the position of the marble to remove
                const position = getMarbleToRemovePosition(cellWithMarble, emptyCell);
                const cellToRemoveMarble = board.getCell(position[0], position[1]);
                if (cellToRemoveMarble.hasMarble() === false) {
                    throw new Error('OnPlayTurn - cellToRemoveMarle muste have a marble')
                }
                cellToRemoveMarble.marble = undefined;

                setBoard(cloneBoard(board))
            }}>Play turn</button>
        </div>
    )
}

function getMarbleToRemovePosition(cell1: Cell, cell2: Cell): number[] {
    const x = (cell1.x + cell2.x) / 2
    const y = (cell1.y + cell2.y) / 2

    return [x, y]
}

export default BoardComponent;