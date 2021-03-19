import { Simulate } from "react-dom/test-utils"
import { Board } from "./Components/Board"

export const newBoard = () => {
    const board = []

    for (let r = 0; r < 6; r++) {
        let row = []
        for (let c = 0; c < 7; c++) {
            row.push(null)
        }
        board.push(row)
    }

    return board
}

export const getColour = (value) => {
    let color = 'white-circle';
    if (value === 1) {
        color = 'red-circle'
    } else if (value === 2) {
        color = 'yellow-circle'
    }

    return color
}

export const checkWinner = (currPlayer, result, board) => {
    let gameState = false
    if (result === 1) {
        gameState = true
    } else if (result === 2) {
        gameState = true
    } else if (result === 'draw') {
        gameState = true
    }

    return [board, (currPlayer === 1) ? 2 : 1, gameState]
}

const verticalCheck = (board) => {
    for (let row=3; row < 6; row++) {
        for (let col=0; col < 7; col++) {
            if (board[row][col]) {
                if (board[row][col] === board[row-1][col] &&
                    board[row][col] === board[row-2][col] &&
                    board[row][col] === board[row-3][col]) {
                        return board[row][col]
                    }
            }
        }
    }
}

const horizontalCheck = (board) => {
    for (let row=0; row < 6; row++) {
        for (let col=0; col < 4; col++) {
            if (board[row][col]) {
                if (board[row][col] === board[row][col+1] &&
                    board[row][col] === board[row][col+2] &&
                    board[row][col] === board[row][col+3]) {
                        return board[row][col]
                    }
            }
        }
    }
}

const diagonalRight = (board) => {
    for (let row = 3; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col]) {
                if (board[row][col] === board[row-1][col+1] &&
                    board[row][col] === board[row-2][col+2] &&
                    board[row][col] === board[row-3][col+3]) {
                        return board[row][col]
                    }
            }
        }
    }
}

const diagonalLeft= (board) => {
    for (let row = 3; row < 6; row++) {
        for (let col = 3; col < 7; col++) {
            if (board[row][col]) {
                if (board[row][col] === board[row-1][col-1] &&
                    board[row][col] === board[row-2][col-2] &&
                    board[row][col] === board[row-3][col-3]) {
                        return board[row][col]
                    }
            }
        }
    }
}

const drawCheck = (board) => {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            if (board[row][col] === null) {
                return null
            }
        }
    }

    return 'draw'
}

export const boardCheck = (board) => {
    return verticalCheck(board) || horizontalCheck(board) || diagonalLeft(board) || diagonalRight(board) || drawCheck(board);
}

const gameFinish = (board, depth, score) => {
    if (depth == 0 || score == 100000 || score == -100000 || drawCheck(board) == 'draw') {
        return true
    }
    return false
}

const copyBoard = (board) => {
    console.log(board)
    const tempBoard = []
    for (let row = 0; row < 6; row++) {
        let temprow = board[row].slice()
        tempBoard.push(temprow)
    }
    return tempBoard
}

const legalMoves = (board) => {
    var legalmoves = []
    for (let col = 0; col < 7; col++) {
        if (board[0][col] == null) {
            legalmoves.push(col)
        }
    }
    return legalmoves
}

const nextState = (col, state, player) => {
    console.log(state)
    for (let row = 5; row >= 0; row--) {
        if (state[row][col] == null) {
          state[row][col] = player
          break
        }
    }
    return state
}
