import { NavLink } from "react-router-dom";
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { navigation } from "../utils/global";
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

/**
 * Menu Navigation bar to navigate to different parts of the project
 * @returns 
 */
export default function Navigation({id}) {

    useEffect(() => {

        const height = 100;
        const width = 1400;
        const space = 120;
        const margin = {left: 50}

        let svg = d3.select(".Navigation")
            .append("svg")
            .attr("width", width)
            .attr("height", height)

        const rScale = d3.scaleOrdinal()
            .domain(["Small", "Large"])
            .range([8, 18])

        const bold = navigation.find(d => d.id === id).name;
        let regular = navigation.filter(d => d.id !== id).map(d => d.name);
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

        let variants = Array(regular.length - 1).fill("none");
        variants.unshift("small-caps");

        const fontVariant = d3.scaleOrdinal()
            .domain(regular)
            .range(variants);

        let sizes = Array(regular.length - 1).fill(12);
        sizes.unshift(14);

        const fontSize = d3.scaleOrdinal()
            .domain(regular)
            .range(sizes)

        let cases = Array(regular.length - 1).fill("none");
        cases.unshift("lowercase");

        const textTransform = d3.scaleOrdinal()
            .domain(regular)
            .range(cases)

        svg
            .append("line")
            .attr("x1", margin.left)
            .attr("x2", space*(navigation.length - 1) + margin.left)
            .attr("y1", height/4)
            .attr("y2", height/4)
            .attr("stroke", "#272B30")

        var nodes = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(navigation)
            .enter()
            // Add one g element for each data node here.
            .append("g")
            // Position the g element like the circle element used to be.
            .attr("transform", function(d, i) {
                // Set d.x and d.y here so that other elements can use it. d is 
                // expected to be an object here.
                d.x = i * space + margin.left;
                d.y = height / 4;
                return "translate(" + d.x + "," + d.y + ")"; 
            })
            .call(wrap, 40);

            nodes.append("circle")
                .attr("class", "nav-node")
                .attr("r", d => rScale(d.size))
                .attr("fill", "#1C2022")
                .attr("stroke", "#272B30")

            // Add a text element to the previously added g element.
            nodes.append("text")
                .attr("text-anchor", "middle")
                .attr("y", 50)
                .attr("font-size", d => fontSize(d.name))
                .attr("font-weight", d => fontWeight(d.name))
                .attr("text-transform", d => textTransform(d.name))
                .attr("font-variant", d => fontVariant(d.name))
                .style("fill", d => fontColor(d.name))
                .text(d => d.name)
    }, [])

    return (
        <div className="Navigation"></div>
    )
}
