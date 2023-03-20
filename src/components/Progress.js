import { useNavigate } from "react-router-dom";
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as d3 from 'd3';
import { useEffect } from 'react';
import { navigationData, wrap, visStyles } from "../utils/global";

const height = 540;
const width = 260;
const space = 35;
const margin = {left: 30, top: 25}
const style = "darkMode";

const rScale = d3.scaleOrdinal()
    .domain(["Small", "Large"])
    .range([5, 8]);

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

function createStrokeScale(pageId, modules, visited) {

    let notVisited = navigationData.filter(d => !modules.includes(d.id) && d.id !== pageId).map(d => d.id);
    let notVisitedStrokes = Array(notVisited.length).fill("#272B30");
    let colors;

    if (visited.length > 1) {
        let visitedStrokes = Array(visited.length - 1).fill(visStyles[style]["secondaryHighlightColor"]);
        colors = [visStyles[style]["highlightColor"]].concat(visitedStrokes.concat(notVisitedStrokes))
    } else {
        colors = [visStyles[style]["highlightColor"]].concat(notVisitedStrokes);
    }

    const index = visited.indexOf(pageId);
    if (index > -1) {
        visited.splice(index, 1);
    }

    let scale = d3.scaleOrdinal()
        .domain([pageId].concat(visited.concat(notVisited)))
        .range(colors);

    return scale;
}

function createScale(pageId, otherPageIds, scaleRange) {

    let scale = d3.scaleOrdinal()
        .domain([pageId].concat(otherPageIds))
        .range(scaleRange);

    return scale;
}

// Click to Navigate to a different page
function onClickNav(navigate) {

    const routeChange = (d) => {
        navigate(d);
    }

    d3.selectAll(".visited-node").on("click", function(e, d) {

        // if(d.id === "predict") {
        //     modules = modules.filter(item => item !== "predict")
        // }

        routeChange(d.navLink)
    })
}

function renderTooltip(pageId, fillScale) {
    
    d3.selectAll(".visited-node").on("mouseover", function(e, d) {

        let thisCircle = d3.select(this);

        thisCircle
            .attr("stroke-width", d => d.id === pageId ? 1: 2)
            .attr("fill", d => d.id === pageId ? visStyles[style]["highlightColor"]: "rgb(154, 0, 255, .5)");

    }).on("mouseout", function() {

        d3.selectAll('.visited-node')
            .attr("stroke-width", 1)
            .attr("fill", d => fillScale(d.id));
    })
}

export default function Progress({id, modules, defaultExpanded = false}) {

    let navigate = useNavigate();
    const fill = [visStyles[style]["highlightColor"]].concat(Array(navigationData.length - 1).fill("#131517"));
    const fontWeight = [visStyles[style]["fontHighlightWeight"]].concat(Array(navigationData.length - 1).fill(visStyles[style]["fontWeight"]));
    const fontColor = [visStyles[style]["textHighlightColor"]].concat(Array(navigationData.length - 1).fill("#868B90"));

    let pageId, otherPageIds;
    let visited, strokeScale, fillScale, fontWeightScale, fontColorScale, textTransformScale;

    useEffect(() => {

        pageId = lookupPageId(id);
        otherPageIds = lookupOtherPages(id);

        // Node scales
        visited = createVisited(modules);
        strokeScale = createStrokeScale(pageId, modules, visited);
        fillScale = createScale(pageId, otherPageIds, fill);

        // Font scales
        fontWeightScale = createScale(pageId, otherPageIds, fontWeight);
        fontColorScale = createScale(pageId, otherPageIds, fontColor);

        // Initialized svg
        let svg = d3.select("#Progress-Chart")
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
            .attr("class", d => d.id === pageId ? "nav-node visited-node": "nav-node")
            .attr("r", d => rScale(d.size))
            .attr("fill", d => fillScale(d.id))
            .attr("stroke", d => strokeScale(d.id));

        nodes.append("text")
            .attr("x", 30)
            .attr("y", 5)
            .attr("font-size", 13)
            .attr("class", "nav-text")
            .attr("font-weight", d => fontWeightScale(d.id))
            .attr("letter-spacing", ".6px")
            .style("fill", d => fontColorScale(d.id))
            .text(d => d.name);

        onClickNav(navigate);
        renderTooltip(pageId, fillScale);

    }, [])

    useEffect(() => {

        pageId = lookupPageId(id);
        otherPageIds = lookupOtherPages(id);

        if (!modules.includes(pageId)) {
            modules.push(pageId)
        }

        visited = createVisited(modules);
        strokeScale = createStrokeScale(pageId, modules, visited);
        fillScale = createScale(pageId, otherPageIds, fill);

        fontWeightScale = createScale(pageId, otherPageIds, fontWeight);
        fontColorScale = createScale(pageId, otherPageIds, fontColor);

        d3.selectAll(".nav-node")
            .attr("class", d => d.id === pageId || visited.includes(d.id) ? "nav-node visited-node": "nav-node")
            .attr("fill", d => fillScale(d.id))
            .attr("stroke", d => strokeScale(d.id));

        d3.selectAll(".nav-text")
            .attr("font-weight", d => fontWeightScale(d.id))
            .style("fill", d => fontColorScale(d.id))

        onClickNav(navigate);
        renderTooltip(pageId, fillScale);

    }, [modules, id])

    return (
        <div className="Progress">
            <Accordion defaultExpanded={defaultExpanded}>
            {/* <Accordion defaultExpanded> */}
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                <div className="Expand">progress</div>
                </AccordionSummary>
                <AccordionDetails className="Container">
                    <div id="Progress-Chart"></div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
