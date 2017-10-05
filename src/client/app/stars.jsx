import React from 'react'

const Stars = (props) => {
    //const numberOfStars = 1 + Math.floor(Math.random() * 9);
    const starsList = Array.apply(null, {length: props.numberOfStars}).map(Number.call, Number);  

    return(
        <div className="col-5">
            {starsList.map(i => 
                <i key={i} className="fa fa-star" ></i>
            )}
        </div>
    );
};

export default Stars;