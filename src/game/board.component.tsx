import { useState } from "react"
import { Board } from "./board"
import CellComponent from "./component/cell.component"
import { GameNode } from "./game.node"

const findSolutionFunc = (findSolution: boolean, playTurn: (gameNode: GameNode) => GameNode, gameNode: GameNode, setFindSolution: Function, setGameNode: Function) => {
    
    let gameNodeRef = gameNode

    let setRefAfter = findSolution;

    let limitIteration = 100000
    
    try {
        while (findSolution && limitIteration > 0) {
            if (gameNodeRef.hasUntriedMove()) {
                gameNodeRef = playTurn(gameNodeRef)
            }
            else if (gameNodeRef.board.getMarbles().length === 1) {
                console.log("Vous avez trouvé une solution optimal!")
                setFindSolution(false)
            }
            else if (gameNodeRef.parent) {
                // console.log('remonter au parent')
                if (gameNodeRef.move) {
                    gameNodeRef.move.score = 36 - gameNodeRef.board.getMarbles().length
                    gameNodeRef.bestScore = gameNodeRef.move.score
                    if (gameNodeRef.parent) {
                        if (gameNodeRef.parent.bestScore < gameNodeRef.bestScore) {
                            gameNodeRef.parent.bestScore = gameNodeRef.bestScore
                        }
                    }
                }
                gameNodeRef = gameNodeRef.parent
            }
            else {
                setFindSolution(false)
            }

            limitIteration--;
        }

        if (limitIteration == 0) {
            setFindSolution(false)
        }
    }
    catch (error) {
        console.error(error)
        setFindSolution(false)
    }

    if (setRefAfter) {
        setGameNode(gameNodeRef)
    }
}

function playTurn(gameNode: GameNode) {
    const { newBoard, moveReference } = gameNode.playTurn()
    gameNode.children.push(new GameNode(newBoard, gameNode, moveReference))
    return gameNode.children[gameNode.children.length - 1]
}

interface BoardComponentArgs {
    gameNode: GameNode;
    setGameNode: Function
}

export const BoardComponent = ({gameNode, setGameNode}: BoardComponentArgs) => {
    const [findSolution, setFindSolution] = useState(false)

    const board = gameNode.board;

    const possibleMoves = gameNode.possibleMoveData

    findSolutionFunc(findSolution, playTurn, gameNode, setFindSolution, setGameNode)

    return (
        <div className="board">
            {
                board.getGrid().map((row, rowIndex) => {
                    return (
                        <div className="row" key={rowIndex}>
                            {
                                row.map((cell, cellIndex) => {
                                    return (
                                        <CellComponent key={cellIndex} cellIndex={cellIndex} cell={cell} possibleMoves={possibleMoves.map(p => p.move)} /> 
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
            <button 
                disabled={possibleMoves.length === 0}
                onClick={() => {
                    const newGameNode = playTurn(gameNode)
                    setGameNode(newGameNode)
            }}>Play turn</button>
            <button
                onClick={() => {
                    setFindSolution(true)
                }}>Find solution</button>
        </div>
    )
}

export default BoardComponent;

