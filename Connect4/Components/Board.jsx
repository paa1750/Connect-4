import React from 'react';
import {Row} from './Row';
import '../../Style.css';

export const Board = (board) => {
    return (
        <div className="board">
            <table>
                {board.board.map((row, i) => <Row key={i} row={row} play={board.play}/>)}
            </table>
        </div>
    )
}