import { GameNode } from "../game.node";
import { Cell } from "../model/cell";

export const findSolutionFunc = (findSolution: boolean, playTurn: (gameNode: GameNode) => GameNode, gameNode: GameNode, setFindSolution: Function, setGameNode: Function) => {
    
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

export function playRandomTurn(gameNode: GameNode) {
    const { newBoard, moveReference } = gameNode.playRandomTurn()
    gameNode.children.push(new GameNode(newBoard, gameNode, moveReference))
    return gameNode.children[gameNode.children.length - 1]
}

export function playTurn(gameNode: GameNode, source: Cell, destination: Cell) {
    const { newBoard, moveReference } = gameNode.playTurn(source, destination)
    gameNode.children.push(new GameNode(newBoard, gameNode, moveReference))
    return gameNode.children[gameNode.children.length - 1]
}