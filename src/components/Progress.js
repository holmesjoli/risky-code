import { useNavigate } from "react-router-dom";
import * as React from 'react';
import { Box, Drawer, Button } from '@material-ui/core';
import * as d3 from 'd3';
import { useEffect } from 'react';
import { config, wrap, visStyles, highlightColorScale } from "../utils/global";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const height = 460;
const width = 260;
const space = 35;
const margin = {left: 30, top: 25}
const style = "darkMode";

let pageId, otherPageIds, highlightColor, fill;
let visited, fillScale, fontWeightScale, fontColorScale, fontWeight, fontColor;
let configLength, configArray = [];

const rScale = d3.scaleOrdinal()
    .domain(["Small", "Large"])
    .range([5, 8]);

function lookupPageId(id, configArray) {
    const pageId = configArray.filter(d => d.id === id).map(d => d.id)[0];
    return pageId;
}

function lookupOtherPages(id, configArray) {
    const pageId = configArray.filter(d => d.id !== id).map(d => d.id);
    return pageId;
}
function createVisited(modules, configArray) {
    let visited = configArray.filter(d => modules.includes(d.id)).map(d => d.id);
    return visited;
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
        routeChange(d.navLink)
    })
}

function renderTooltip(pageId, fillScale) {
    
    d3.selectAll(".visited-node").on("mouseover", function(e, d) {

        let thisCircle = d3.select(this);

        thisCircle
            .attr("stroke-width", d => d.id === pageId ? 1: 2)
            .attr("fill", d => highlightColorScale(d.group))
            .attr("fill-opacity", d => d.id === pageId ? 1: .5)

    }).on("mouseout", function() {

        d3.selectAll('.visited-node')
            .attr("stroke-width", 1)
            .attr("fill", d => fillScale(d.id));
    })
}

function updateProgress(id, modules, navigate) {

    pageId = lookupPageId(id, configArray);
    otherPageIds = lookupOtherPages(id, configArray);
    highlightColor = highlightColorScale(configArray.find(d => d.id === pageId).group);
    fill = [highlightColor].concat(Array(configLength - 1).fill("#131517"));

    visited = createVisited(modules, configArray);
    fillScale = createScale(pageId, otherPageIds, fill);

    fontWeightScale = createScale(pageId, otherPageIds, fontWeight);
    fontColorScale = createScale(pageId, otherPageIds, fontColor);

    d3.selectAll(".nav-node")
        .attr("class", d => d.id === pageId || visited.includes(d.id) ? "nav-node visited-node": "nav-node")
        .attr("fill", d => fillScale(d.id))
        .attr("stroke", d => visited.includes(d.id) ? highlightColorScale(d.group): "#272B30");

    d3.selectAll(".nav-text")
        .attr("font-weight", d => fontWeightScale(d.id))
        .style("fill", d => fontColorScale(d.id))

    onClickNav(navigate);
    renderTooltip(pageId, fillScale);
}

function initProgress(id, modules, navigate) {
    pageId = lookupPageId(id, configArray);
    otherPageIds = lookupOtherPages(id, configArray);
    highlightColor = highlightColorScale(configArray.find(d => d.id === pageId).group);
    fill = [highlightColor].concat(Array(configLength - 1).fill("#131517"));;

    // Node scales
    visited = createVisited(modules, configArray);
    fillScale = createScale(pageId, otherPageIds, fill);

    // Font scales
    fontWeightScale = createScale(pageId, otherPageIds, fontWeight);
    fontColorScale = createScale(pageId, otherPageIds, fontColor);

    let svg = d3.select("#Progress-Chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    svg
        .append("line")
        .attr("x1", margin.left)
        .attr("x2", margin.left)
        .attr("y1", margin.top)
        .attr("y2", space*(configLength - 1) + margin.top)
        .attr("stroke", "#272B30")

    var nodes = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(configArray)
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
        .attr("stroke", d => visited.includes(d.id) ? highlightColorScale(d.group): "#272B30");

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
}

function RenderProgress({id, modules, navigate}) {

    useEffect(() => {
        initProgress(id, modules, navigate);
    }, [])

    useEffect(() => {
        updateProgress(id, modules, navigate);
    }, [modules, id])

    return(
        <div className="Container3">
            <h3>Progress</h3>
            <p>Navigate to completed modules by clicking on an outlined node</p>
            <div id="Progress-Chart"></div>
        </div>
    )
}

export default function Progress({id, modules}) {

    let navigate = useNavigate();
    configLength = Object.keys(config).length;
    fontWeight = [visStyles[style]["fontHighlightWeight"]].concat(Array(configLength - 1).fill(visStyles[style]["fontWeight"]));
    fontColor = [visStyles[style]["textHighlightColor"]].concat(Array(configLength - 1).fill("#868B90"));
    pageId = lookupPageId(id, configArray);

    if (!modules.includes(pageId)) {
        modules.push(pageId)
    }

    // update configArray
    for (let i of Object.entries(config)) {
        configArray.push(i[1])
    }

    const [state, setState] = React.useState({
        left: false,
    });
    const toggleDrawer =
        (anchor, open) =>
        (event) => {
        if (
            event.type === 'keydown' &&
            ((event).key === 'Tab' ||
            (event).key === 'Shift')
        ) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    return (
        <div className="Progress Right-Border">
            {(['left']).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)} variant="outlined" color="secondary">progress</Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <Box
                            sx={{ width: 300 }}
                            role="presentation"
                            onClick={toggleDrawer(anchor, false)}
                            onKeyDown={toggleDrawer(anchor, false)}
                            className="Progress-Chart"
                            >
                                <RenderProgress id={id} modules={modules} navigate={navigate}/>
                        </Box>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
