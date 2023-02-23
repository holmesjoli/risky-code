import { useNavigate } from "react-router-dom";
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as d3 from 'd3';
import { useEffect } from 'react';
import { navigationData, wrap, visStyles } from "../utils/global";

const height = 505;
const width = 260;
const space = 35;
const margin = {left: 30, top: 30}
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

    let notVisited = navigationData.filter(d => !modules.includes(d.id) & d.id !== pageId).map(d => d.id);
    let visitedColors = Array(visited.length).fill(visStyles[style]["secondaryHighlightColor"]);
    let notVisitedStrokes = Array(notVisited.length).fill("#272B30");

    let scale = d3.scaleOrdinal()
        .domain([pageId].concat(visited.concat(notVisited)))
        .range([visStyles[style]["highlightColor"]].concat(visitedColors.concat(notVisitedStrokes)));

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
            .attr("fill", d => d.id !== pageId ? "rgb(127, 194, 67, .2)": visStyles[style]["highlightColor"]);

    }).on("mouseout", function() {

        d3.selectAll('.nav-node')
            .attr("stroke-width", 1)
            .attr("fill", d => fillScale(d.id));
    })
}

export default function Progress({id, modules}) {

    let navigate = useNavigate();
    const fill = [visStyles[style]["highlightColor"]].concat(Array(navigationData.length - 1).fill("#131517"));
    const fontWeight = [visStyles[style]["fontHighlightWeight"]].concat(Array(navigationData.length - 1).fill(visStyles[style]["fontWeight"]));
    const fontColor = [visStyles[style]["textHighlightColor"]].concat(Array(navigationData.length - 1).fill("#868B90"));
    const textTransform = ["lowercase"].concat(Array(navigationData.length - 1).fill("none"));

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
        textTransformScale = createScale(pageId, otherPageIds, textTransform);

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
            .attr("class", d => visited.includes(d.id) ? "nav-node": null)
            .attr("r", d => rScale(d.size))
            .attr("fill", d => fillScale(d.id))
            .attr("stroke", d => strokeScale(d.id));

        nodes.append("text")
            .attr("x", 30)
            .attr("y", 5)
            .attr("font-size", 13)
            .attr("class", "nav-text")
            .attr("font-weight", d => fontWeightScale(d.id))
            .attr("text-transform", d => textTransformScale(d.id))
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
        textTransformScale = createScale(pageId, otherPageIds, textTransform);

        d3.selectAll(".nav-node")
            .attr("class", d => visited.includes(d.id) ? "nav-node": null)
            .attr("fill", d => fillScale(d.id))
            .attr("stroke", d => strokeScale(d.id));

        d3.selectAll(".nav-text")
            .attr("font-weight", d => fontWeightScale(d.id))
            .attr("text-transform", d => textTransformScale(d.id))
            .style("fill", d => fontColorScale(d.id))

        onClickNav(navigate);
        renderTooltip(pageId, fillScale);

    }, [modules, id])

    return (
        <div className="Progress">
            <Accordion>
            {/* <Accordion defaultExpanded> */}
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                <div className="Expand">progress</div>
                </AccordionSummary>
                <AccordionDetails>
                    <div id="Progress-Chart"></div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
