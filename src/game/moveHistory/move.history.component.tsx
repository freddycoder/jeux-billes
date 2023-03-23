import { GameNode } from "../game.node"

interface MoveHistoryComponentArgs {
    gameNode: GameNode
}

export const MoveHistoryComponent = ({gameNode}: MoveHistoryComponentArgs) => {

    let gameNodeRef = gameNode;
    const listLi = []
    if (gameNode.move) {
        do {
            listLi.push(
                <li>move {gameNodeRef.move?.move.cellWithMarble.x} {gameNodeRef.move?.move.cellWithMarble.y} to {gameNodeRef.move?.move.emptyCell.x} {gameNodeRef.move?.move.emptyCell.y}</li>
            )
            if (gameNodeRef.parent) {
                gameNodeRef = gameNodeRef.parent
            }
        } while (gameNodeRef.parent)
    }

    return (
        <ul className="sideList">
             {
                listLi.reverse()
             }
        </ul>
    )
}