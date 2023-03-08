import React from 'react'
import { useState, useEffect } from 'react';


// adpated from https://stackoverflow.com/questions/40885923/countdown-timer-in-react
export default function Timer({children}) {

    // const {initialMinute = 0,initialSeconds = 0} = props;
    const [minutes, setMinutes ] = useState(5);
    const [seconds, setSeconds ] =  useState(0);
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
        };
    });

    return (
        <div className="Timer Card-Group">
            <h4>discuss</h4>
            {children}
            { minutes === 0 && seconds === 0
                ? null
                : <div className="Countdown"> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</div> 
            }
        </div>
    )
}
