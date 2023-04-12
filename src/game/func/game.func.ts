import { GameNode } from "../game.node";
import { Cell } from "../model/cell";

export const findSolutionFunc = (playTurn: (gameNode: GameNode) => GameNode, gameNode: GameNode, setGameNode: Function) => {
    
    let gameNodeRef = gameNode

    let findSolution = true
    let setRefAfter = findSolution;

    let limitIteration = 100000
    
    try {
        while (findSolution && limitIteration > 0) {
            if (gameNodeRef.hasUntriedMove("findSolutionFunc while, first if")) {
                gameNodeRef = playTurn(gameNodeRef)
            }
            else if (gameNodeRef.board?.getMarbles().length === 1) {
                console.log("Vous avez trouvé une solution optimal!")
                findSolution = false
            }
            else if (gameNodeRef.parent) {
                // console.log('remonter au parent')
                if (gameNodeRef.move) {
                    gameNodeRef.move.score = 36 - (gameNodeRef.board?.getMarbles().length ?? 0)
                    gameNodeRef.bestScore = gameNodeRef.move.score
                    if (gameNodeRef.parent) {
                        if (gameNodeRef.parent.bestScore < gameNodeRef.bestScore) {
                            gameNodeRef.parent.bestScore = gameNodeRef.bestScore
                        }
                    }
                }
                gameNodeRef = gameNodeRef.parent
                if (gameNodeRef.hasUntriedMove("findSolution before cleanup") === false) {
                    gameNodeRef.children?.forEach(c => {
                        c.move = undefined
                        c.parent = undefined
                        c.possibleMoveData = undefined
                        c.board = undefined
                    })
                    gameNodeRef.children = []
                }
            }
            else {
                findSolution = false
            }

            limitIteration--;
        }

        if (limitIteration == 0) {
            findSolution = false
        }
    }
    catch (error) {
        console.error(error)
        findSolution = false
    }

    if (setRefAfter) {
        setGameNode(gameNodeRef)
    }
}

export function playRandomTurn(gameNode: GameNode) {
    const { newBoard, moveReference } = gameNode.playRandomTurn()
    if (gameNode.children == null) {
        throw new Error("Parameter gameNode is null when calling playRandomTurn function")
    }
    gameNode.children.push(new GameNode(newBoard, gameNode, moveReference))
    return gameNode.children[gameNode.children.length - 1]
}

export function playTurn(gameNode: GameNode, source: Cell, destination: Cell) {
    const { newBoard, moveReference } = gameNode.playTurn(source, destination)
    if (gameNode.children == null) {
        throw new Error("Parameter gameNode is null when calling playTurn function")
    }
    gameNode.children.push(new GameNode(newBoard, gameNode, moveReference))
    return gameNode.children[gameNode.children.length - 1]
}