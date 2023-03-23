import { useState } from 'react'
import './App.css'
import BoardComponent from './game/board.component'
import { MoveHistoryComponent } from './game/moveHistory/move.history.component'
import { GameNode } from './game/game.node'
import { Board } from './game/board'

const useStateDefaut = new GameNode(new Board())

function App() {
  const [gameNode, setGameNode] = useState(useStateDefaut)
  return (
    <div className="App">
      <BoardComponent gameNode={gameNode} setGameNode={setGameNode} />
      <MoveHistoryComponent gameNode={gameNode} />
    </div>
  )
}

export default App
