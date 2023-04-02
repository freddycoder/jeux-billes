import { GameNode } from "../game.node"
import { MoveComponent } from "./move.component";

interface MoveHistoryComponentArgs {
    gameNode: GameNode,
    setGameNode: Function
}

export const MoveHistoryComponent = ({gameNode, setGameNode}: MoveHistoryComponentArgs) => {
    let gameNodeRef = gameNode;
    const listLi = []
    if (gameNodeRef.move) {
        do {
            listLi.push(
                <MoveComponent gameNodeRef={gameNodeRef} setGameNode={setGameNode} />
            )
            if (gameNodeRef.parent) {
                gameNodeRef = gameNodeRef.parent
            }
        } while (gameNodeRef.parent)
    }

    return (
        <ul className="sideList">
             {
                listLi
             }
        </ul>
    )
}