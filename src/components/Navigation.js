import { useNavigate } from "react-router-dom";
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { navigationData, highlightColor } from "../utils/global";
import * as d3 from 'd3';
import { useEffect } from 'react';
import { wrap } from "../utils/global";

const height = 505;
const width = 260;
const space = 42;
const margin = {left: 30, top: 30}

const rScale = d3.scaleOrdinal()
    .domain(["Small", "Large"])
    .range([5, 9])

export default function Navigation({id, modules}) {

    let navigate = useNavigate(); 
    const routeChange = (d) => {
        navigate(d);
    }

    useEffect(() => {

        d3.select("#Navigation-Chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height)

    }, [])

    useEffect(() => {

        let svg = d3.select("#Navigation-Chart svg")

        let highlight = navigationData.filter(d => d.id === id).map(d => d.id)[0];
        let regularColors = navigationData.filter(d => d.id !== id).map(d => d.id);

        if (!modules.includes(highlight)) {
            modules.push(highlight)
        }

        let visited = navigationData.filter(d => modules.includes(d.id)).map(d => d.id);
        let notVisited = navigationData.filter(d => !modules.includes(d.id)).map(d => d.id);
        let visitedColors = Array(visited.length).fill(highlightColor);
        let notVisitedStrokes = Array(notVisited.length).fill("#272B30");

        let fill = Array(regularColors.length).fill("#131517");
        regularColors.unshift(highlight);
        fill.unshift(highlightColor);

        const fillScale = d3.scaleOrdinal()
            .domain(regularColors)
            .range(fill);

        const strokeScale = d3.scaleOrdinal()
            .domain(visited.concat(notVisited))
            .range(visitedColors.concat(notVisitedStrokes));

        let bold = navigationData.filter(d => d.id === id).map(d => d.name)[0];
        let regular = navigationData.filter(d => d.id !== id).map(d => d.name);
        regular.unshift(bold);

        let weights = Array(regular.length - 1).fill(400);
        weights.unshift(500);

        const fontWeight = d3.scaleOrdinal()
            .domain(regular)
            .range(weights);

        let colors = Array(regular.length - 1).fill("#868B90");
        colors.unshift("#cbcbcb");

        const fontColor = d3.scaleOrdinal()
            .domain(regular)
            .range(colors);

        let cases = Array(regular.length - 1).fill("none");
        cases.unshift("lowercase");

        const textTransform = d3.scaleOrdinal()
            .domain(regular)
            .range(cases);

        svg
            .append("line")
            .attr("x1", margin.left)
            .attr("x2", margin.left)
            .attr("y1", margin.top)
            .attr("y2", space*(navigationData.length - 1) + margin.top)
            .attr("stroke", "#272B30")

        var nodes = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(navigationData)
            .enter()
            // Add one g element for each data node here.
            .append("g")
            // Position the g element like the circle element used to be.
            .attr("transform", function(d, i) {
                // Set d.x and d.y here so that other elements can use it. d is 
                // expected to be an object here.
                d.x = margin.left;
                d.y = i * space + margin.top;
                return "translate(" + d.x + "," + d.y + ")"; 
            })
            .call(wrap, 40);

        nodes.append("circle")
            .attr("class", d => visited.includes(d.id) ? "nav-node shadow2": null)
            .attr("r", d => rScale(d.size))
            .attr("fill", d => fillScale(d.id))
            .attr("stroke", d => strokeScale(d.id));

        // Add a text element to the previously added g element.
        nodes.append("text")
            .attr("x", 30)
            .attr("y", 5)
            .attr("font-size", 13)
            .attr("font-weight", d => fontWeight(d.name))
            .attr("text-transform", d => textTransform(d.name))
            .attr("letter-spacing", ".8px")
            .style("fill", d => fontColor(d.name))
            .text(d => d.name);

        // Click to Navigate to a different page
        d3.selectAll(".nav-node").on("click", function(e, d) {

            // if(d.id === "predict") {
            //     modules = modules.filter(item => item !== "predict")
            // }

            routeChange(d.navLink)
        })

        d3.selectAll(".nav-node").on("mouseover", function(e, d) {

            let thisCircle = d3.select(this);

            thisCircle
                .attr("stroke-width", d => d.id !== highlight? 2: 1)
                .attr("fill", d => d.id !== highlight? "rgb(127, 194, 67, .2)": highlightColor);

        }).on("mouseout", function() {

            d3.selectAll('.nav-node')
                .attr("stroke-width", 1)
                .attr("fill", d => fillScale(d.id));
        })

    }, [modules, id])

    return (
        <div className="Navigation">
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                <div className="Button">progress</div>
                </AccordionSummary>
                <AccordionDetails>
                    <div id="Navigation-Chart"></div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
