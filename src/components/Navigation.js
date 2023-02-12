import { NavLink } from "react-router-dom";
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { navigationData } from "../utils/global";
import * as d3 from 'd3';
import { useEffect } from 'react';

function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = 0, //parseFloat(text.attr("dy")),
            tspan = text.text(null)
                        .append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", dy + "em");

        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + dy + "em")
                            .text(word);
            }
        }
    });
}

const height = 610;
const width = 260;
const space = 50;
const margin = {left: 30, top: 30}

const rScale = d3.scaleOrdinal()
    .domain(["Small", "Large"])
    .range([6, 10])

export default function Navigation({id}) {

    useEffect(() => {

        let svg = d3.select("#Navigation-Chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height)

        let bold = navigationData.filter(d => d.id === id).map(d => d.name);
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

        let highlight = navigationData.filter(d => d.id === id).map(d => d.id);
        let regularColors = navigationData.filter(d => d.id !== id).map(d => d.id);
        regularColors.unshift(highlight);

        let colorsCircle = Array(regular.length - 1).fill("#272B30");
        colorsCircle.unshift("#7FC243");

        const strokeScale = d3.scaleOrdinal()
            .domain(regularColors)
            .range(colorsCircle);

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
                .attr("class", "nav-node")
                .attr("r", d => rScale(d.size))
                .attr("fill", "#1C2022")
                .attr("stroke", d => strokeScale(d.id))

            // Add a text element to the previously added g element.
            nodes.append("text")
                // .attr("text-anchor", "middle")
                .attr("x", 30)
                .attr("y", 5)
                .attr("font-size", 13)
                .attr("font-weight", d => fontWeight(d.name))
                .attr("text-transform", d => textTransform(d.name))
                .style("fill", d => fontColor(d.name))
                .text(d => d.name)
    }, [])

    return (
        <div className="Navigation">
            <Accordion>
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
