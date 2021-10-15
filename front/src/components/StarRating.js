import React from "react"

// function to create skill rating from 
const BallRating = ({value}) => {

    const limit = 5;
    let activeArr = []
    const active = <svg width="16" height="16">
    <circle
        cx={7}
        cy={7}
        r={7}
        stroke={"grey"}
        strokeWidth={"1"}
        fill={"#8FB1CC"}
    />
    </svg>
    const empty = <svg width="16" height="16">
    <circle
        cx={7}
        cy={7}
        r={7}
        stroke={"grey"}
        strokeWidth={"1"}
        fill={"#EEECF1"}
    />
        </svg>

    for(let i = 0; i < limit; i++) {
        if(i < value) {
            activeArr.push(active)
        } else {
            activeArr.push(empty)
        }
    }

    console.log(activeArr)


    return (
            <span>
                {activeArr.map(a => {
                    return a
                })}
            </span>
    )


}


export default BallRating