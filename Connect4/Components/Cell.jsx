import React from 'react';
import {getColour} from '../Helper';
import '../../Style.css';

export const Cell = (value) => {
    const color = getColour(value.value);

    return (
        <td>
            <div className="cell" onClick={() => {value.play(value.cIdx)}}>
                <div className={color}></div>
            </div>
        </td>
    )
}