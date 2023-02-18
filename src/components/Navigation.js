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
    .range([5, 9]);

function lookupPageId(id) {
    const pageId = navigationData.filter(d => d.id === id).map(d => d.id)[0];
    return pageId;
}

function lookupOtherPages(id) {
    const pageId = navigationData.filter(d => d.id !== id).map(d => d.id);
    return pageId;
}

function createVisited(modules) {
    let visited = navigationData.filter(d => modules.includes(d.id)).map(d => d.id);
    return visited;
}

function createStrokeScale(modules, visited) {
 
    let notVisited = navigationData.filter(d => !modules.includes(d.id)).map(d => d.id);
    let visitedColors = Array(visited.length).fill(highlightColor);
    let notVisitedStrokes = Array(notVisited.length).fill("#272B30");

    let strokeScale = d3.scaleOrdinal()
        .domain(visited.concat(notVisited))
        .range(visitedColors.concat(notVisitedStrokes));

    return strokeScale;
}

function createFillScale(pageId, otherPageIds) {

    let fill = Array(otherPageIds.length).fill("#131517");

    let fillScale = d3.scaleOrdinal()
        .domain([pageId].concat(otherPageIds))
        .range([highlightColor].concat(fill));

    return fillScale;
}

function createFontWeight(pageId, otherPageIds) {

    let weights = Array(otherPageIds.length).fill(400);
    
    const fontWeight = d3.scaleOrdinal()
        .domain([pageId].concat(otherPageIds))
        .range([500].concat(weights));

    return fontWeight;
}

function createFontColor(pageId, otherPageIds) {

    let colors = Array(otherPageIds.length).fill("#868B90");

    const fontColor = d3.scaleOrdinal()
        .domain([pageId].concat(otherPageIds))
        .range(["#cbcbcb"].concat(colors));

    return fontColor;
}

function createTextTransform(pageId, otherPageIds) {

    let cases = Array(otherPageIds.length).fill("none");

    const textTransform = d3.scaleOrdinal()
        .domain([pageId].concat(otherPageIds))
        .range(["lowercase"].concat(cases));

    return textTransform;
}

// Click to Navigate to a different page
function onClickNav(navigate) {

    const routeChange = (d) => {
        navigate(d);
    }

    d3.selectAll(".nav-node").on("click", function(e, d) {

        // if(d.id === "predict") {
        //     modules = modules.filter(item => item !== "predict")
        // }

        routeChange(d.navLink)
    })
}

function renderTooltip(pageId, fillScale) {
    
    d3.selectAll(".nav-node").on("mouseover", function(e, d) {

        let thisCircle = d3.select(this);

        thisCircle
            .attr("stroke-width", d => d.id !== pageId ? 2: 1)
            .attr("fill", d => d.id !== pageId ? "rgb(127, 194, 67, .2)": highlightColor);

    }).on("mouseout", function() {

        d3.selectAll('.nav-node')
            .attr("stroke-width", 1)
            .attr("fill", d => fillScale(d.id));
    })
}

export default function Navigation({id, modules}) {

    let navigate = useNavigate();

    useEffect(() => {

        let pageId = lookupPageId(id);
        let otherPageIds = lookupOtherPages(id);

        if (!modules.includes(pageId)) {
            modules.push(pageId)
        }

        // Node scales
        let visited = createVisited(modules);
        let strokeScale = createStrokeScale(modules, visited);
        let fillScale = createFillScale(pageId, otherPageIds);

        console.log(otherPageIds)


        // Font scales
        let fontWeight = createFontWeight(pageId, otherPageIds);
        let fontColor = createFontColor(pageId, otherPageIds);
        let textTransform = createTextTransform(pageId, otherPageIds);

        // Initialized svg
        let svg = d3.select("#Navigation-Chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

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
            .append("g")
            .attr("transform", function(d, i) {
                d.x = margin.left;
                d.y = i * space + margin.top;
                return "translate(" + d.x + "," + d.y + ")"; 
            })
            .call(wrap, 40);

        nodes.append("circle")
            .attr("class", d => visited.includes(d.id) ? "nav-node": null)
            .attr("r", d => rScale(d.size))
            .attr("fill", d => fillScale(d.id))
            .attr("stroke", d => strokeScale(d.id));

        nodes.append("text")
            .attr("x", 30)
            .attr("y", 5)
            .attr("font-size", 13)
            .attr("class", "nag-text")
            .attr("font-weight", d => fontWeight(d.name))
            .attr("text-transform", d => textTransform(d.name))
            .attr("letter-spacing", ".8px")
            .style("fill", d => fontColor(d.name))
            .text(d => d.name);

        onClickNav(navigate);
        renderTooltip(pageId, fillScale);

    }, [])

    useEffect(() => {

        let pageId = lookupPageId(id);
        let otherPageIds = lookupOtherPages(id);

        if (!modules.includes(pageId)) {
            modules.push(pageId)
        }

        let visited = createVisited(modules);
        let strokeScale = createStrokeScale(modules, visited);
        let fillScale = createFillScale(pageId, otherPageIds);

        let fontWeight = createFontWeight(pageId, otherPageIds);
        let fontColor = createFontColor(pageId, otherPageIds);
        let textTransform = createTextTransform(pageId, otherPageIds);

        d3.selectAll(".nav-node")
            .attr("class", d => visited.includes(d.id) ? "nav-node": null)
            .attr("fill", d => fillScale(d.id))
            .attr("stroke", d => strokeScale(d.id));

        d3.selectAll(".nav-text")
            .attr("font-weight", d => fontWeight(d.name))
            .attr("text-transform", d => textTransform(d.name))
            .style("fill", d => fontColor(d.name))

        onClickNav(navigate);
        renderTooltip(pageId, fillScale);

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
