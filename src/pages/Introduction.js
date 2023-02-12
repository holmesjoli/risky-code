import React from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import Description from '../components/Description';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from "@material-ui/core";
import data from "../data/processed/policy.json";
import * as d3 from 'd3';
import { useEffect } from 'react';

// Tooltip
function renderTooltip(circle) {

    let tooltip = d3.select("#policyChart")
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

        d3.select(this).attr("opacity", 1).raise();

    }).on("mouseout", function() {

        tooltip.style("visibility", "hidden");
        circle.attr("opacity", 1);

        d3.selectAll('.node')
            .attr("stroke-width", .5)
            .attr("stroke", "none"); 
    });
}

// Adapted from https://d3-graph-gallery.com/graph/dendrogram_radial_basic.html
// and https://observablehq.com/@d3/radial-tree
function policyDiagram() {

    const colorScale = d3.scaleOrdinal()
        .domain([2, 4, 3, 1, 0])
        .range(["#0d0887", "#a41e9a", "#d35171", "#f0804e", "#000000"]);

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
        width = 650 - margin.left - margin.right,
        height = 650 - margin.top - margin.bottom;

    const radius = width / 2;
    const svg = d3.select("#policyChart")
        .append("svg")
            .attr("width", width)
            .attr("height", height)
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
        .attr("stroke", '#272B30')
        .attr("stroke-width", 2);

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

    renderTooltip(circle);
}


export function Content() {

    useEffect(() => {
        policyDiagram();
    }, [])

    return(
        <div className="Content Two-Column2">
            <div id="policyChart" className="chart"></div>
            <div><p>In May 2016, the investigative newsroom, ProPublica, published an article titled <em>Machine Bias</em>. The article accused Equivant (formerly Northepointe), the developer of COMPAS, a recidivism algorithm, of overlooking encoded racial bias in the algorithm's predictions <NavLink to="/Resources">(Angwin et al. 2016)</NavLink>. The article sparked passionate discourse across industries and disciplines — journalists, lawyers, data scientists, and mathematicians — resulting in the replication of the analysis many times over <NavLink to="/Resources">(Flores, Bechtel, and Lowenkamp 2016; Corbett-Davies et al. 2016)</NavLink>. However, the discourse did not result in a consensus supporting claims made by the authors of Machine Bias or a complete vindication of Equivant. Instead, it sparked several new questions enshroud with complexity about algorithmically informed decision-making — what does it mean for an algorithm to be biased, and alternatively, what does it mean to be fair?</p></div>
        </div>
    )
}

export default function Introduction({config}) {

    let navigate = useNavigate(); 
    const routeNext = () => {
      let path = `/Classify`; 
      navigate(path);
    }

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <div className="Sidebar">
                    <Description config={config}/>
                    <div className="Button-Container">  
                        <Button variant="contained" className="Next" onClick={routeNext}>next</Button>
                    </div>
                    <Navigation id={config.id}/>
                </div>
                <div>
                    <Content />
                </div>
            </div>
            <Footer/>
        </div>
    )
}