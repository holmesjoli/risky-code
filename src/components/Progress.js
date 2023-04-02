import { useNavigate } from "react-router-dom";
import * as React from 'react';
import { Box, Drawer, Button } from '@material-ui/core';
import * as d3 from 'd3';
import { useEffect } from 'react';
import { config, wrap, visStyles, highlightColorScale } from "../utils/global";

const height = 540;
const width = 260;
const space = 35;
const margin = {left: 30, top: 25}
const style = "darkMode";

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

export default function Progress({id, modules, defaultExpanded = false, className="Purple"}) {

    let navigate = useNavigate();
    let configLength = Object.keys(config).length;
    var result = Object.entries(config);
    let configArray = [];

    for (let i of result) {
        configArray.push(i[1])
    }

    const fontWeight = [visStyles[style]["fontHighlightWeight"]].concat(Array(configLength - 1).fill(visStyles[style]["fontWeight"]));
    const fontColor = [visStyles[style]["textHighlightColor"]].concat(Array(configLength - 1).fill("#868B90"));

    let pageId, otherPageIds, highlightColor, fill;
    let visited, fillScale, fontWeightScale, fontColorScale;

    const [state, setState] = React.useState({
        right: false,
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

    useEffect(() => {

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

    }, [])

    useEffect(() => {

        pageId = lookupPageId(id, configArray);
        otherPageIds = lookupOtherPages(id, configArray);
        highlightColor = highlightColorScale(configArray.find(d => d.id === pageId).group);
        fill = [highlightColor].concat(Array(configLength - 1).fill("#131517"));

        if (!modules.includes(pageId)) {
            modules.push(pageId)
        }

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

    }, [modules, id])

    return (
        <div>
        {(['right']).map((anchor) => (
            <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)} className="Purple">progress</Button>
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
                    >
                    <div className="Container">
                        <h3>Progress</h3>
                        <div id="Progress-Chart"></div>
                    </div>
                </Box>
            </Drawer>
            </React.Fragment>
        ))}
        </div>
    );
}
