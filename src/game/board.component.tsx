import { useState } from "react"
import CellComponent from "./component/cell.component"
import { GameNode } from "./game.node"
import { Cell } from "./model/cell"
import { findSolutionFunc, playRandomTurn } from "./func/game.func"

interface BoardComponentArgs {
    gameNode: GameNode;
    setGameNode: Function
}

export const BoardComponent = ({ gameNode, setGameNode }: BoardComponentArgs) => {
    const [selectedCell, setSelectedCell] = useState<Cell | undefined>(undefined)

    const board = gameNode.board;

    const possibleMoves = gameNode.possibleMoveData

    return (<>
        {
            gameNode.board?.id === 0 &&
                <div>
                    <p>Selectionner une bille à enlever pour démarrer une partie.</p>
                    <p>Les billes avec un arrière plan vert sont des configurations ayant une solution.</p>
                </div>
        }
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
                }}>Jouer un tour au hasard</button>
            <button
                disabled={gameNode.board?.id === 0}
                onClick={() => {
                    findSolutionFunc(playRandomTurn, gameNode, setGameNode)
                }}>Essayer de trouver une solution</button>
        </div>
    </>)
}

export default BoardComponent;

