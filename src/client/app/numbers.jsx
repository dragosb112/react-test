import React from 'react'

const Numbers = (props) => {  
    
    const numberClassName = (number) => {
        if(props.selectedNumbers.indexOf(number) >= 0){
            return "used";
        } else if(props.usedNumbers.indexOf(number) >= 0){
            return "selected";
        }
     };

    return (
        <div className="card text-center">
            <div>
                {Numbers.list.map((number, i) => 
                    <span key={i} 
                    onClick={() => props.selectNumber(number)}
                    className={numberClassName(number)}>{number}</span> 
                )}
            </div>
        </div>
    );
};

const N = 9;
Numbers.list = [...Array(N).keys()].map(x => ++x);

export default Numbers;