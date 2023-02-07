import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from "@material-ui/core";
import Main from "../../components/Main";
import { config }  from "../../utils/global";
import Legend from "../../components/Legend";

function Information() {
    return (
        <div className="Information">
            <Legend componentType={"default"}/>
        </div>
    )
}

export function Content() {
    return(
        <div className="Content Three-Column">
            <Information/>
        </div>
    )
}

export default function falseNegative() {
    return(
        <Main config={config.falseNegative}/>
    )
}
