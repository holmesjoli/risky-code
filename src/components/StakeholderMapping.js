import React, { useEffect, useState } from 'react';
import { Fab, Button, FormControl, RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox, TextField } from '@material-ui/core';
import * as d3 from 'd3';
import AddIcon from '@material-ui/icons/Add';
import { visStyles } from "../utils/global";
import Progress from "./Progress";

let values = [{"value": "Freedom", "checked": false}, 
              {"value": "Autonomy", "checked": false}, 
              {"value": "Privacy", "checked": false}, 
              {"value": "Trust", "checked": false}, 
              {"value": "Security", "checked": false}, 
              {"value": "Safety", "checked": false}, 
              {"value": "Anonymity", "checked": false}, 
              {"value": "Identity", "checked": false}, 
              {"value": "Reliability", "checked": false}, 
              {"value": "Fairness", "checked": false}, 
              {"value": "Accountability", "checked": false}, 
              {"value": "Inclusion", "checked": false}, 
              {"value": "Ownership and property", "checked": false}, 
              {"value": "Peace", "checked": false}, 
              {"value": "Efficiency", "checked": false},
              {"value": "Dignity", "checked": false},
              {"value": "Informed consent", "checked": false}, 
              {"value": "Environment sustainability", "checked": false}, 
              {"value": "Transparency", "checked": false}
        ];

const defaultValues = values;

let chartId = "Stakeholder-Mapping-Diagram";
let legendId = "Stakeholder-Mapping-Legend";
let width = 550;
let height = 375;
let style = "darkMode";

let link, node, text;
let simulation;

const fillScale = d3.scaleOrdinal()
    .domain(["direct", "indirect", "excluded"])
    .range(["#FE4002", "#FD7B03", "#F3C010"])

const sizeScale = d3.scaleOrdinal()
    .domain(["stakeholder", "value"])
    .range([350, 50]);

export function transform(d) {
    return "translate(" + d.x + "," + d.y + ")";
}

// dragging functions
function drag() {

    function dragstarted(event, d) {
      d3.select(this).raise().attr("stroke", "black");
    }

    function dragged(event, d) {
      d3.select(this).attr("cx", d.x = event.x).attr("cy", d.y = event.y);
    }

    function dragended(event, d) {
      d3.select(this).attr("stroke", null);
    }

    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
}

export function symbolScale(d) {

    if(d === "direct") {
        return d3.symbolCircle;
    } else if (d === "indirect") {
        return d3.symbolSquare;
    } else if (d === "excluded") {
        return d3.symbolTriangle;
    } else {
        return d3.symbolStar;
    }
}

function renderTooltip(chartId) {
    var tooltip = d3.select(`#${chartId} .tooltip`);

    d3.selectAll(".network-nodes").on("mouseover", function (e, d) {

        var cx = d.x + 20;
        var cy = d.y - 10;

        let thisCircle = d3.select(this);

        thisCircle
            .attr("stroke-width", 2)
            .attr("stroke", visStyles[style]["secondaryHighlightColor"]);

        tooltip.style("visibility", "visible")
            .style("left", cx + "px")
            .style("top", cy + "px")
            .html(d.group === "stakeholder"? `${d.id}`: `${d.name}`);

    }).on("mouseout", function () {
        tooltip.style("visibility", "hidden");

        d3.selectAll(".network-nodes")
            .attr("stroke", "none");
    });
}

export function initNetwork(chartId, width, height, data) {
    let svg = d3.select(`#${chartId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.select(`#${chartId}`)
        .append("div")
        .attr("class", "tooltip");

    link = svg.append("g")
        .attr("stroke", visStyles[style]["linkColor"])
        .attr("stroke-width", visStyles[style]["linkWidth"])
        .selectAll("line");

    node = svg.append("g")
        .attr("stroke-width", visStyles[style]["linkWidth"])
        .attr("cursor", "default")
        .selectAll("circle");

    text = svg.append("g")
        .selectAll("text");

    simulation = d3.forceSimulation()
        .force("charge", d3.forceManyBody().strength(-10))
        .force("link", d3.forceLink().id(d => d.id).distance(45))
        .force("center", d3.forceCenter(width / 2, height / 2).strength(1))
        .force("collide", d3.forceCollide().strength(.5).radius(10))
        .on("tick", ticked);

    function ticked() {

        node.attr("transform", transform)

        link.attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        text
            .attr("x", function (d) { return d.x + 10; })
            .attr("y", function (d) { return d.y - 10; });
    }

    updateNetwork(chartId, data);
}

export function updateNetwork(chartId, data) {

    let svg = d3.select(`#${chartId} svg`);

    if (data !== undefined) {

        node = node
        .data(data.nodes, d => d.id)
        .join(enter => enter.append("path")
                    .attr("class", "network-nodes")
                    .attr("fill", d => fillScale(d.fill))
                    .attr("d", d3.symbol()
                        .type(((d) => d.group === "stakeholder" ? symbolScale(d.type): d3.symbolStar))
                        .size(d => sizeScale(d.group)))
                );

        link = link
            .data(data.links, d => `${d.source.id}\t${d.target.id}`)
            .join("line");

        text = svg
            .selectAll("text")
            .data(data.nodes, d => d.id)
            .join(
                enter  => enter.append("text")
                    .attr("fill", d => d.group === "value"? visStyles[style]["textColor"]: visStyles[style]["textHighlightColor"])
                    .attr("font-size", visStyles[style]["fontSize"])
                    .attr("font-weight", d => d.group === "value"? visStyles[style]["fontWeight"]: visStyles[style]["fontHighlightWeight"])
                    .attr("cursor", "default")
                    .attr("letter-spacing", ".6px")
                    .text(d => d.group !== "value" ? d.name: `${d.name}`)
        );

        simulation.nodes(data.nodes);
        simulation.force("link").links(data.links);
        simulation.alpha(1).restart();

        node.call(drag);
        renderTooltip(chartId);

    }
}

export function initStakeholderLegend(legendStakeholderId) {

    let height = 40;

    d3.select(`#${legendStakeholderId}`)
        .append("svg")
        .attr("width", 250)
        .attr("height", height);

    drawStakeholderLegend(legendStakeholderId);
}

export function drawStakeholderLegend(legendId) {
    
    const fillData = [{"type": "direct", "name": "Direct", "group": "stakeholder"},
                        {"type": "indirect", "name": "Indirect", "group": "stakeholder"},
                        {"type": "excluded", "name": "Excluded", "group": "stakeholder"},
                        {"type": "value", "name": "Value", "group": "value"}]
    
    let svg = d3.select(`#${legendId} svg`)
    let h = 40;

    let shape = svg.append("g")
        .selectAll("path")
            .data(fillData, d => d.fill)
            .enter()
            .append("g")
        .attr("transform", (d, i) => `translate(${(i * 60) + 20}, ${h / 3})`)

    shape.append("path")
        .attr("d", d3.symbol()
            .type(((d) => d.group === "stakeholder" ? symbolScale(d.type): d3.symbolStar))
            .size(100))
        .attr("fill", "#cbcbcb");

    // Add a text element to the previously added g element.
    shape.append("text")
        .attr("text-anchor", "middle")
        .attr("y", 20)
        .attr("fill", visStyles[style]["textColor"])
        .attr("font-size", visStyles[style]["fontSize"])
        .attr("fill", visStyles[style]["textHighlightColor"])
        .attr("font-size", 12)
        .attr("letter-spacing", visStyles[style]["letterSpacing"])
        .text(d => d.name);
}

function StakeholderNetwork(data, setData) {

    const resetNetwork = () => {
        setData({"nodes": [], "links": []})
    }

    useEffect(() => {
        initNetwork(chartId, width, height, data);
        initStakeholderLegend(legendId);
    }, [])

    useEffect(() => {
        updateNetwork(chartId, data);
    }, [data])

    return(
        <div className="Container">
            <h3 className="Small-Margin">stakeholder network</h3>
            <div className='Container2'>
                <div id={chartId}></div>
                <h4>legend</h4>
                <h5>Stakeholder type</h5>
                <div id={legendId} className="Small-Margin-Bottom"></div>
            </div>
            <div>
                <div className="Three-Column-Equal Margin-Top">
                    <div></div>
                    <Button variant="outlined" color="secondary" onClick={resetNetwork}>reset network</Button>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

function AddStakeholder(data, setData, stakeholderData, setStakeholderData, stakeholderIdArray, className) {

    const [stakeholderName, setStakeholderName] = useState("");
    const [stakeholderGroup, setStakeholderGroup] = useState("direct");
    const [stakeholderValues, setStakeholderValues] = useState(values);

    const updateStakeholderValues = (ev) => {

        const v = stakeholderValues.map(obj => {
            if (obj.value == ev.target.value) {
                return {...obj, checked: ev.target.checked}
            }
            return obj;
            }
        )

        setStakeholderValues(v)
    };

    const updateStakeholder = ev => {
        setStakeholderName(ev.target.value);
    }

    const updateStakeholderGroup = ev => {
        setStakeholderGroup(ev.target.value);
    }

    const add = () => {

        let dataNew = Object.assign({}, data);
        let dataS = Object.assign([], stakeholderData);
        let links = [];
        let nodes = [];

        let stakeholder = {"id": stakeholderName,
                           "name": stakeholderName,
                           "group": "stakeholder",
                           "type": stakeholderGroup};

        dataNew.nodes.push(stakeholder);
        nodes.push(stakeholder);
        for (let i of stakeholderValues.filter(d => d.checked)) {

            if (!stakeholderIdArray.includes(i.value)) {
                stakeholderIdArray.push(i.value)
                dataNew.nodes.push({"id": i.value,
                                    "name": i.value,
                                    "group": "value",
                                    "type": stakeholderGroup});
            }

            nodes.push({"id": i.value,
                        "name": i.value,
                        "group": "value",
                        "type": stakeholderGroup});

            dataNew.links.push({"source": i.value, "target": stakeholderName});
            links.push({"source": i.value, "target": stakeholderName});
        }

        let s = {
            "nodes": nodes,
            "links": links,
            "id": stakeholderName,
            "name": stakeholderName,
            "stakeholderType": stakeholderGroup
        }

        dataS.push(s);

        setStakeholderData(dataS)
        setData(dataNew);
        setStakeholderName("");
        setStakeholderGroup("direct");
        setStakeholderValues(defaultValues);
    }

    return(
        <div className="Stakeholder-Attr Container">
            <h3 className="Small-Margin">add stakeholder to network</h3>
            <div className="Container2 Margin-Bottom">
                <h4 className="Small-Margin">stakeholder group</h4>
                <TextField className={className} value={stakeholderName} placeholder="Stakeholder group name" variant="outlined" onChange={updateStakeholder} />
            </div>
            <div className="Container2 Margin-Bottom">
                <FormControl>
                    <h4 className="Small-Margin">stakeholder type</h4>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="direct"
                        name="radio-buttons-group"
                        onChange={updateStakeholderGroup}
                        value={stakeholderGroup}
                    >
                        <FormControlLabel className={className} value="direct" control={<Radio />} label="Direct" />
                        <FormControlLabel className={className} value="indirect" control={<Radio />} label="Indirect" />
                        <FormControlLabel className={className} value="excluded" control={<Radio />} label="Excluded" />
                    </RadioGroup>
                </FormControl>
            </div>
            <div className="Container2 Small-Margin Small-Padding-Bottom">
                <h4 className="Small-Margin">stakeholder values</h4>
                <div>
                </div>
                <FormGroup>
                        {stakeholderValues.map(el => 
                            <FormControlLabel key={el.value}
                            className={className}
                            label={el.value}
                            control={<Checkbox className="Value-Check" value={el.value} checked={el.checked} onChange={updateStakeholderValues} />}
                            />
                        )}
                </FormGroup>
            </div>
            <div className="Add-Stakeholder-Button">
                <Fab color="primary" onClick={add} className={className}>
                    <AddIcon />
                </Fab>
            </div>
        </div>
    )
}

export default function StakeholderMapping({data, setData, stakeholderData, setStakeholderData, className}) {

    const [stakeholderIdArray, updateStakeholderIdArray] = useState(['stakeholders']);

    return(
        <div className="Content No-Padding-Top">
            <div className="One-Column-Three">
                <div className="">
                    {AddStakeholder(data, setData, stakeholderData, setStakeholderData, stakeholderIdArray, className)}
                </div>
                <div className="">
                    {StakeholderNetwork(data, setData)}
                </div>
            </div>
        </div>
    )
}
