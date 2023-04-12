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
            move {gameNodeRef.move?.move.cellWithMarble.x} {gameNodeRef.move?.move.cellWithMarble.y} to {gameNodeRef.move?.move.emptyCell.x} {gameNodeRef.move?.move.emptyCell.y}
        </li>
    )
}