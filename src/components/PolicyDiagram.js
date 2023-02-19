import data from "../data/processed/policy.json";
import * as d3 from 'd3';
import { visStyles } from "../utils/global";

// Tooltip
function renderTooltip(chartID, style="darkMode") {

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
            .html(`${d.data.name}`);

        thisCircle
            .attr("stroke", visStyles[style]["highlightColor"])
            .attr("stroke-width", 1.5);

    }).on("mouseout", function() {

        tooltip.style("visibility", "hidden");

        d3.selectAll('.node')
            .attr("stroke", visStyles[style]["borderColor"])
            .attr("stroke-width", 1);
    });
}

// Adapted from https://d3-graph-gallery.com/graph/dendrogram_radial_basic.html
// and https://observablehq.com/@d3/radial-tree
export function policyDiagram(chartID, width = 430, height = 430, style = "darkMode") {

    const colorScale = d3.scaleOrdinal()
        .domain([2, 4, 3, 1, 0, 5])
        // .range(["#5B1647", "#93063E", "#CA0035", "#FF5627", "#000000"])
        .range(["#9A00FF", "#F50141", "#FE4002", "#FD7B03", "#000000", "#F3C010"]);

    const rScale = d3.scaleOrdinal()
        .domain(["Root", "Policy area", "Example"])
        .range([0, 9, 6])

    const textColorScale = d3.scaleOrdinal()
        .domain(["Root", "Policy area", "Example"])
        .range(["#000000", "#ffffff", "#d8d8d8"])

    const textSizeScale = d3.scaleOrdinal()
        .domain(["Root", "Policy area", "Example"])
        .range(["0px", "12px", "10px"]);

    const margin = {top:0, right: 0, bottom: 10, left: 0},
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
        .size([360, radius - 20]);  // 360 means whole circle. radius - 60 means 60 px of margin around dendrogram

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
        .attr("class", d => d.source.depth === 0 ? "Hidden": "Visible")
        .attr("stroke", 'rgb(134, 139, 144)')
        .attr("stroke-width", .5);

    // Add a circle for each node.
    let circle = svg
        .selectAll("g")
        .data(root.descendants())
        .join("g")
        .attr("transform", function(d) {
            return `rotate(${d.x-90})
            translate(${d.y})`;
        });

    circle
        .append("a")
        .attr("href", d => !d.children ? d.data.link: "none")
        .attr("target", "_blank")
        .append("circle")
        .attr("class", d => !d.children ? "node": "none")
        .attr("cursor", d => !d.children ? "auto": "none")
        .attr("r", ((d) => rScale(d.data.group)))
        .attr("fill", visStyles[style]["fillColor"])
        .attr("stroke", visStyles[style]["borderColor"])
        .attr("stroke-width", 1.5);

    circle
        .append("text")
        .attr("transform", d => `rotate(${d.x >= Math.PI ? 180 : 0})`)
        .attr("dy", "0.32em")
        .attr("x", d => (d.x < Math.PI) === !d.children ? 10 : -10)
        .attr("class", d => d.data.area_id === 0 ? "Hidden": "Visible")
        .attr("fill", visStyles[style]["textColor"])
        .attr("font-size", 11)
        .text((d, i) => d.children ? labels[i]: "");

    renderTooltip(chartID);
}
