import React from "react"


/**
 *  function to create skill rating from
 *  limit marks the maximum value for skill understanding 5/7
 *  
*/ 
const BallRating = ({value}) => {
    
    const limit = 7;
    let activeArr = []
    const active = 
    <circle
        cx={7}
        cy={7}
        r={7}
        stroke={"grey"}
        strokeWidth={"1"}
        fill={"#8FB1CC"}
    />
    const empty = 
    <circle
        cx={7}
        cy={7}
        r={7}
        stroke={"grey"}
        strokeWidth={"1"}
        fill={"#EEECF1"}
    />
     

    for(let i = 0; i < limit; i++) {
        if(i < value) {
            activeArr.push(active)
        } else {
            activeArr.push(empty)
        }
    }

    // console.log(activeArr)
    

    return (
            <span>
                {activeArr.map((ball, index) => {
                    return <svg width="16" height="16" key={index}>{ball}</svg>
                })}
            </span>
    )


}


export default BallRating