import React, {useState, useEffect} from 'react';
import './App.css';
import { Row } from './Connect4/Components/Row';
import {newBoard, checkWinner, boardCheck} from './Connect4/Helper';
import { Board } from './Connect4/Components/Board';

function App() {

  const [currPlayer, setPlayer] = useState(1)
  const [thisboard, setBoard] = useState(newBoard())
  const [gameFinish, setgameFinish] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (gameFinish) {
      var winner
      if (currPlayer === 1) {
        winner = "Opponent"
      } else {
        winner = "You"
      }
      setMsg("Game Over, " + winner + " won")
    }
  }, [gameFinish])


  const newGame = () => {
    const board = []
    for (let r = 0; r < 6; r++) {
        let row = []
        for (let c = 0; c < 7; c++) {
            row.push(null)
        }
        board.push(row)
    }
    setBoard(board)
    setPlayer(1)
    setgameFinish(false)
    setMsg('')
  }

  const play = (cIdx) => {
    if (gameFinish === false) {
      const tempboard = thisboard
      for (let row = 5; row >= 0; row--) {
        if (!tempboard[row][cIdx]) {
          tempboard[row][cIdx] = currPlayer
          break
        }
      }

      const result = boardCheck(tempboard)
      const winCheck = checkWinner(currPlayer, result, tempboard)
      setBoard(winCheck[0])
      setPlayer(winCheck[1])
      if (winCheck[2] === true){
        setgameFinish(winCheck[2])
      }
    } else {
      setMsg('Game Over, restart the Game')
    }
  }

  

  return (
    <>
      <div>
        <button className="button" onClick={() => newGame()}>Restart</button>
        <Board board={thisboard} play={play}></Board>
        <p className="msg">{msg}</p>
      </div>
    </>
  );
}

export default App;
