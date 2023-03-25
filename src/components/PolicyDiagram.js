import data from "../data/processed/policy.json";
import * as d3 from 'd3';
import { visStyles } from "../utils/global";

// Tooltip
function renderTooltip(chartID, style) {

    let tooltip = d3.select(`#${chartID}`)
        .append("div")
        .attr("class", "tooltip");

    d3.selectAll(".example").on("mouseover", function(e, d) {

        let thisCircle = d3.select(this);
        let x = e.layerX + 20;
        let y = e.layerY - 10;

        // console.log(thisCircle)

        tooltip.style("visibility", "visible")
            .style("top", `${y}px`)
            .style("left", `${x}px`)
            .html(`${d.data.name}`);

        thisCircle
            .attr("stroke", visStyles[style]["highlightColor"])
            .attr("stroke-width", 1.5);

    }).on("mouseout", function() {

        tooltip.style("visibility", "hidden");

        d3.selectAll('.example')
            .attr("stroke", visStyles[style]["borderColor"])
            .attr("stroke-width", 1);
    });
}

function adjustY(d) {

    if (d.x < 50) {
        return 28;
    } else if (d.x >= 50 && d.x <= 250 && d.y < 120) {
        return -25;
    } else if (d.y > 200) {
        return 0;
    } else {
        return 25;
    }
}

function adjustX(d) {

    if (d.x >= 180 && d.x < 250 && d.y >= 180) {
        return -165;
    } else if(d.x >= 250 && d.y >= 180) {
        return -152;
    }else {
        return -10;
    }
}

function randomColor() {
    let colors = visStyles["colorMode"].colors;
    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function adjustFillColor(style) {
    if (style === "darkMode") {
        return visStyles[style]["fillColor"];
    } else {
        return randomColor();
    }
}

function transitionColor() {
    d3.selectAll(".node")
        .transition()
        .ease(d3.easePoly)
        .duration(2000)
        .style("fill", d => randomColor())
        .on('end', transitionColor);
}

export function transitionHighlightBack(style) {
    d3.selectAll(".highlight")
        .transition()
        .ease(d3.easePoly)
        .delay((d, i) => i*2000)
        .duration(2000)
        .attr("fill", visStyles[style]["fillColor"])
        .attr("stroke", visStyles[style]["borderColor"])
        .attr("fill-opacity", 1)
        .on('end', function() {transitionHighlight(style)});
}

export function transitionHighlight(style) {
    d3.selectAll(".highlight")
        .transition()
        .ease(d3.easePoly)
        .delay((d, i) => i*1000)
        .duration(1000)
        .attr("fill", visStyles[style]["highlightColor"])
        .attr("fill-opacity", .5)
        .attr("stroke", visStyles[style]["highlightColor"])
        .on('end', function() {transitionHighlightBack(style)});
}

function adjustStrokeColor(highlightNodes, style, d) {

    if (highlightNodes) {

        const scale = d3.scaleOrdinal()
            .domain([true, false])
            .range([visStyles[style]["highlightColor"], visStyles[style]["borderColor"]]);
        return scale(d.data.highlight);

    } else {
        return "#FFF";
    }
}

function adjustTextColor(highlightNodes, style, d) {

    if (highlightNodes) {

        const scale = d3.scaleOrdinal()
            .domain([true, false])
            .range([visStyles[style]["textHighlightColor"], visStyles[style]["textColor"]]);
        return scale(d.data.highlight);

    } else {
        return visStyles[style]["textHighlightColor"];
    }
}

function adjustFontWeight(highlightNodes, style, d) {

    if (highlightNodes) {

        const scale = d3.scaleOrdinal()
            .domain([true, false])
            .range([visStyles[style]["fontHighlightWeight"], visStyles[style]["fontWeight"]]);
        return scale(d.data.highlight);

    } else {
        return visStyles[style]["fontWeight"];
    }
}

function highlightClass(d) {

    if (!d.children && d.data.highlight) {
        return "node example highlight";
    } else if(!d.children) {
        return "node example";
    } else {
        return "node"
    }
}

function adjustLabels(highlightNodes, d, labels, i) {

    if (highlightNodes) {
        return d.children || d.data.highlight ? labels[i]: "";
    } else {
        return d.children ? labels[i]: "";
    }
}

// Adapted from https://d3-graph-gallery.com/graph/dendrogram_radial_basic.html
// and https://observablehq.com/@d3/radial-tree
export function policyDiagram(chartID, width = 430, height = 430, style = "darkMode", highlightNodes = false) {

    const rScale = d3.scaleOrdinal()
        .domain(["Root", "Policy area", "Example"])
        .range([0, 8, 5]);

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
        .attr("stroke", visStyles[style]["linkColor"])
        .attr("stroke-width", visStyles[style]["linkWidth"]);

    // Add a circle for each node.
    let circle = svg
        .selectAll("g")
        .data(descendants)
        .join("g")
        .attr("transform", function(d) {
            return `rotate(${d.x-90}) translate(${d.y})`;
        });

    circle
        .append("a")
            .attr("href", d => !d.children ? d.data.link: "none")
            .attr("target", "_blank")
        .append("circle")
            .attr("class", d => highlightClass(d))
            .attr("cursor", d => !d.children ? "auto": "none")
            .attr("r", ((d) => rScale(d.data.group)))
            .attr("fill", d => adjustFillColor(style))
            .attr("stroke", d => adjustStrokeColor(highlightNodes, style, d))
            .attr("stroke-width", .75);

    circle
        .append("text")
            .attr("transform", d => `rotate(${-(d.x-90)})`)
            .attr("dy", "0.32em")
            .attr("x", d => adjustX(d))
            .attr("y", d => adjustY(d))
            .attr("class", d => d.data.area_id === 0 ? "Hidden": "Visible")
            .attr("fill", d => adjustTextColor(highlightNodes, style, d))
            .attr("font-size", visStyles[style]["fontSize"])
            .attr("letter-spacing", visStyles[style]["letterSpacing"])
            .attr("font-weight", d => adjustFontWeight(highlightNodes, style, d))
            .text((d, i) => adjustLabels(highlightNodes, d, labels, i));

    if (style === "colorMode") {
        transitionColor();
    }

    if (!highlightNodes) {
        renderTooltip(chartID, style);
    }

    // if (highlightNodes) {
    //     transitionHighlight(style);
    // }

    adjustFillColor(style);
}
