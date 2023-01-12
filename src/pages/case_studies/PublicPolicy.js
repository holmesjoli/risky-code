import Main from "../../components/Main";
import { config }  from "../../utils/global";
import data from "../../data/processed/policy.json";
import * as d3 from 'd3';
import { useEffect } from "react";

//Adapted from https://d3-graph-gallery.com/graph/dendrogram_radial_basic.html
function policyDiagram() {

    const colorScale = d3.scaleOrdinal()
        .domain([2, 4, 3, 1, 0])
        .range(["#0d0887", "#a41e9a", "#d35171", "#f0804e", "#000000"]);

    const rScale = d3.scaleOrdinal()
        .domain(["root", "area", "example"])
        .range([0, 8, 5])
    
    const margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = 600 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    const radius = width / 2;

    const svg = d3.select("#chart")
        .append("svg")
            .attr("width", width)
            .attr("height", height)
        .append("g")
            .attr("transform", `translate(${radius},${radius})`);

    const cluster = d3.cluster()
        .size([360, radius - 60]);  // 360 means whole circle. radius - 60 means 60 px of margin around dendrogram

        // Give the data to this cluster layout:
        const root = d3.hierarchy(data, function(d) {
            return d.children;
        });

    cluster(root);

    // Features of the links between nodes:
    const linksGenerator = d3.linkRadial()
        .angle(function(d) { return d.x / 180 * Math.PI; })
        .radius(function(d) { return d.y; });

    // Add the links between nodes:
    svg.selectAll('path')
        .data(root.links())
        .join('path')
        .attr("d", linksGenerator)
        .style("fill", 'none')
        .attr("stroke", '#ccc');

    // Add a circle for each node.
    svg.selectAll("a")
        .data(root.descendants())
        .join("a")
        .attr("transform", function(d) {
            return `rotate(${d.x-90})
            translate(${d.y})`;
        })
        .append("circle")
            .attr("r", ((d) => rScale(d.data.group)))
            .style("fill", ((d) => colorScale(d.data.area_id)));
}

export function Content() {

    useEffect(() => {
        policyDiagram();
    }, [])

    return(
        <div className="Content">
            <div id="chart"></div>
        </div>
    )
}
export default function publicPolicy() {
    return(
        <Main config={config.publicPolicy}/>
    )
}
