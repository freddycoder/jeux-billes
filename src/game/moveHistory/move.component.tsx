import { GameNode } from "../game.node"

interface MoveComponentArgs {
    setGameNode: Function
    gameNodeRef: GameNode
}

export const MoveComponent = ({setGameNode, gameNodeRef}: MoveComponentArgs) => {
    return (
        <li style={{
            border: '1px solid white',
            borderRadius: '5px',
            listStyle: 'none',
            cursor: 'pointer'
        }}
            title="Revert this move"
            onClick={() => setGameNode(gameNodeRef.parent)}>
            {
                gameNodeRef.move?.move.emptyCell?.x != null
                ? 
                `déplacer ${gameNodeRef.move?.move.cellWithMarble.x} ${gameNodeRef.move?.move.cellWithMarble.y} vers ${gameNodeRef.move?.move.emptyCell?.x} ${gameNodeRef.move?.move.emptyCell?.y} | A ${gameNodeRef.marbleA} B ${gameNodeRef.marbleB} C ${gameNodeRef.marbleC}`
                :
                `enlever ${gameNodeRef.move?.move.cellWithMarble.x} ${gameNodeRef.move?.move.cellWithMarble.y} | A ${gameNodeRef.marbleA} B ${gameNodeRef.marbleB} C ${gameNodeRef.marbleC}`
            }
        </li>
    )
}