import React from 'react'

const DoneFrame = (props) => {
    return (
        <div>
        <h2>{props.doneStatus}</h2>
        <button onClick={props.resetGame}>Play again</button>
        </div>
    );
};

export default DoneFrame;