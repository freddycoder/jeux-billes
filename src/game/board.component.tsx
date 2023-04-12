import { useState } from "react"
import CellComponent from "./component/cell.component"
import { GameNode } from "./game.node"
import { Cell } from "./model/cell"
import { findSolutionFunc, playRandomTurn } from "./func/game.func"

interface BoardComponentArgs {
    gameNode: GameNode;
    setGameNode: Function
}

export const BoardComponent = ({gameNode, setGameNode}: BoardComponentArgs) => {
    const [selectedCell, setSelectedCell] = useState<Cell | undefined>(undefined)

    const board = gameNode.board;

    const possibleMoves = gameNode.possibleMoveData

    return (
        <div className="board">
            {
                board?.getGrid().map((row, rowIndex) => {
                    return (
                        <div className="row" key={rowIndex}>
                            {
                                row.map((cell, cellIndex) => {
                                    return (
                                        <CellComponent 
                                            key={cellIndex} 
                                            cellIndex={cellIndex} 
                                            cell={cell} 
                                            possibleMoves={possibleMoves?.map(p => p.move) ?? []}
                                            selectedCell={selectedCell}
                                            setSelectedCell={setSelectedCell}
                                            gameNode={gameNode}
                                            setGameNode={setGameNode} /> 
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
            <button 
                disabled={possibleMoves?.length === 0}
                onClick={() => {
                    const newGameNode = playRandomTurn(gameNode)
                    setGameNode(newGameNode)
            }}>Play random turn</button>
            <button
                onClick={() => {
                    findSolutionFunc(playRandomTurn, gameNode, setGameNode)
                }}>Try find solution</button>
        </div>
    )
}

export default BoardComponent;

