import React from 'react'
import { useState, useEffect } from 'react';

// adpated from https://stackoverflow.com/questions/40885923/countdown-timer-in-react
export default function Timer({user, disableNext, setDisableNext, children}) {

    const [minutes, setMinutes ] = useState(0);
    const [seconds, setSeconds ] =  useState(2);
    useEffect(()=> {

        if (disableNext) {
            let myInterval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }

                if (seconds === 1) {
                    setDisableNext(false);
                }

                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(myInterval);
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                }

            }, 1000)
            return ()=> {
                clearInterval(myInterval);
            };
        }
    });

    if (user === "group") {
        return (
        <div className="Timer Card-Group">
            <h3>discuss</h3>
            {children}
            {!disableNext
                ? null
                : <div className="Countdown"> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</div> 
            }
        </div>
        )
    } else {
        setDisableNext(false);
        return(
        <div className="Timer Card-Group">
            <h3>consider</h3>
            {children}
        </div>
        )
    }
}
