import Main from "../../components/Main";
import { config }  from "../../utils/global";
import * as d3 from "d3";
import { useEffect } from 'react';
// import lookup from '../data/processed/lu.json'

function Visualization() {

    const width = 280, height = 280;
    const threshold = 4;

    useEffect(() => {
        const svg = d3.select("#COMPAS-Visualization")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const plot = svg.append("g")
        //     .attr("transform", `translate(${radius},${radius})`)
        //     .attr('id', 'Position-Plot');

        // const link = plot.append("g")
        //     .attr("fill", "none")
        //     .attr("stroke", "#4e5155")
        //     .attr("stroke-opacity", 1)
        //     .attr("stroke-width", 1.5)
        //     .selectAll("path")
        //     .data(root.links())
        //     .enter()
        //     .append("path")
        //     .attr("d", (d3.linkRadial() as any)
        //         .angle(d => d.x)
        //         .radius(d => d.y));

        // const node = plot.append("g")
        //     .attr("stroke-linejoin", "round")
        //     .attr("stroke-width", 3)
        //     .selectAll("g")
        //     .data(root.descendants().reverse())
        //     .enter()
        //     .append("g")
        //     .attr("transform", d => `rotate(${radToDeg(d.x) - 90}) translate(${d.y},0)`);

        // node.append("circle")
        //     .attr("r", d => d.children ? 4 : 2)
        //     .attr('id', (d: any) => d.data.descr)
        //     .attr('class', 'Position-Node')

        // updatePositionNodes()
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
        </div>
    )
}
export default function compas() {
    return(
        <Main config={config.compas}/>
    )
}
