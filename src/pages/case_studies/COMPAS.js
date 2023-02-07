import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from "@material-ui/core";
import { FormControl, MenuItem, Select} from "@material-ui/core";
import { useEffect, useState } from 'react';
import * as d3 from "d3";
import Main from "../../components/Main";
import Legend from "../../components/Legend";
import Slider from "../../components/Slider";
import { config }  from "../../utils/global";
import data from '../../data/processed/compas.json'

function Fairness() {

    const fairnessOpts = ["Calibration", "False Positive Rate", "False Negative Rate"];
    const [fairnessBy, updateFairness] = useState('');

    const handleChange = (event) => {
        let newCategory = event.target.value;
        updateFairness(newCategory);
    }

    return(
        <div className="Select-Fairness">
            <h3>Fairness definition</h3>
            <FormControl variant="outlined" size="small">
                <Select
                    labelId="fairness-select-label"
                    id="fairness-select"
                    displayEmpty
                    value={fairnessBy}
                    onChange={handleChange}
                >
                {
                    fairnessOpts.map((category) => {
                        return (
                            <MenuItem key={category} value={category}><em>{category}</em></MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
    </div>
    )
}


function Visualization() {

    const width = 280, height = 280;
    const threshold = 4;

    useEffect(() => {
        const svg = d3.select("#COMPAS-Visualization")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const plot = svg.append("g")

        const point = plot
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", 100)
            .attr("cy", 100)
            .attr("r", 1.5)
            .attr("fill", "white")

    }, [])

    return (
        <div className="Visualization">
             <div id='COMPAS-Visualization'></div>
        </div>
    )
}

function Probability() {
    return (
        <div className="Probability">
            <h3>Predicted probability of reoffense</h3>
            <Slider/>
        </div>
    )
}

function Interaction() {
    return(
        <div className="Interaction">
            <Fairness/>
            <Probability/>
        </div>
    )
}

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
            <Interaction/>
            <Visualization/>
            <Information/>
        </div>
    )
}

export default function compas() {
    return(
        <Main config={config.compas}/>
    )
}
