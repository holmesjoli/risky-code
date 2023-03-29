import React from 'react'
import { useState, useEffect } from 'react';

// adpated from https://stackoverflow.com/questions/40885923/countdown-timer-in-react
export default function Timer({user, disableNext, setDisableNext, children, className}) {

    const [minutes, setMinutes ] = useState(3);
    const [seconds, setSeconds ] =  useState(2);

    useEffect(()=> {

        if (disableNext) {
            let myInterval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }

                if (minutes === 0 && seconds === 1) {
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
        <div className={className + " Timer Container2 Margin-Bottom"}>
            <h4 className="Small-Margin">discuss</h4>
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
        <div className="Timer Container2 Margin-Bottom">
            <h4 className="Small-Margin">consider</h4>
            {children}
        </div>
        )
    }
}
