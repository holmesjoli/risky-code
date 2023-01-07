import { FormControl, MenuItem, Select} from "@material-ui/core";
import { useEffect, useState } from 'react';
import * as d3 from "d3";
import Main from "../../components/Main";
import Legend from "../../components/Legend";
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

export function Content() {
    return(
        <div className="Content Three-Column">
            <Visualization/>
            <div>
                <Legend/>
                <Fairness/>
            </div>        
        </div>
    )
}
export default function compas() {
    return(
        <Main config={config.compas}/>
    )
}
