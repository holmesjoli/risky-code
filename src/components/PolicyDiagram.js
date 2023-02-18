import data from "../data/processed/policy.json";
import * as d3 from 'd3';

// Tooltip
function renderTooltip(chartID) {

    let tooltip = d3.select(`#${chartID}`)
        .append("div")
        .attr("class", "tooltip");

    d3.selectAll(".node").on("mouseover", function(e, d) {

        let thisCircle = d3.select(this);
        let x = e.layerX + 20;
        let y = e.layerY - 10;

        tooltip.style("visibility", "visible")
            .style("top", `${y}px`)
            .style("left", `${x}px`)
            .html(`${d.data.group}: <b>${d.data.name}</b>`);

        thisCircle
            .attr("stroke", "white")
            .attr("stroke-width", 2);

    }).on("mouseout", function() {

        tooltip.style("visibility", "hidden");

        d3.selectAll('.node')
            .attr("stroke-width", .5)
            .attr("stroke", "none"); 
    });
}

// Adapted from https://d3-graph-gallery.com/graph/dendrogram_radial_basic.html
// and https://observablehq.com/@d3/radial-tree
export function policyDiagram(chartID, width = 550, height = 550) {

    const colorScale = d3.scaleOrdinal()
        .domain([2, 4, 3, 1, 0])
        // .range(["#5B1647", "#93063E", "#CA0035", "#FF5627", "#000000"])
        .range(["#9A00FF", "#F50141", "#FE4002", "#FD7B03", "#000000"]);

    const rScale = d3.scaleOrdinal()
        .domain(["Root", "Policy area", "Example"])
        .range([0, 8, 5])

    const textColorScale = d3.scaleOrdinal()
        .domain(["Root", "Policy area", "Example"])
        .range(["#000000", "#ffffff", "#d8d8d8"])

    const textSizeScale = d3.scaleOrdinal()
        .domain(["Root", "Policy area", "Example"])
        .range(["0px", "12px", "10px"]);

    const margin = {top: 50, right: 50, bottom: 50, left: 50},
        w = width - margin.left - margin.right,
        h = height - margin.top - margin.bottom;

    const radius = w / 2;
    const svg = d3.select(`#${chartID}`)
        .append("svg")
            .attr("width", w)
            .attr("height", h)
        .append("g")
            .attr("transform", `translate(${radius},${radius})`);

    // Set-up layout
    const cluster = d3.cluster()
        .size([360, radius - 60]);  // 360 means whole circle. radius - 60 means 60 px of margin around dendrogram

    // Give the data to this cluster layout:
    const root = d3.hierarchy(data, function(d) {
        return d.children;
    });
    
    cluster(root);

    let label = d => d.name;
    let descendants = root.descendants();
    const labels =  descendants.map(d => label(d.data, d));

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
        .attr("stroke", 'rgb(134, 139, 144)')
        .attr("stroke-width", 1);

    // Add a circle for each node.
    let circle = svg.append("g")
        .selectAll("a")
        .data(root.descendants())
        .join("a")
        .attr("transform", function(d) {
            return `rotate(${d.x-90})
            translate(${d.y})`;
        })

    circle
        .append("circle")
        .attr("class", "node")
        .attr("r", ((d) => rScale(d.data.group)))
        .style("fill", ((d) => colorScale(d.data.area_id)));

    circle
        .append("text")
        .attr("transform", d => `rotate(${d.x >= Math.PI ? 180 : 0})`)
        .attr("dy", "0.32em")
        .attr("x", d => (d.x < Math.PI) === !d.children ? 6 : -6)
        .attr("text-anchor", d => (d.x < Math.PI) === !d.children ? "start" : "end")
        .attr("paint-order", "stroke")
        .attr("fill", ((d) => textColorScale(d.data.group)))
        .attr("font-size", ((d) => textSizeScale(d.data.group)))
        .text((d, i) => labels[i]);

    renderTooltip(chartID);
}
