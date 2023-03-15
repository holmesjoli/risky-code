import React, { useEffect, useState } from 'react';
import { Fab, Button, FormControl, RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox, TextField } from '@material-ui/core';
import * as d3 from 'd3';
import AddIcon from '@material-ui/icons/Add';
import { visStyles } from "../utils/global";

let values = ["Freedom", "Autonomy", "Privacy", "Security", "Safety", "Anonymity", "Reliability", "Trust", "Fairness", "Accountability", "Inclusion", "Dignity", "Ownership and property", "Peace", 
"Informed consent", "Identity", "Environment sustainability",  "Transparency", "Efficiency"];

let chartId = "Stakeholder-Mapping-Diagram";
let legendId = "Stakeholder-Mapping-Legend";
let width = 650;
let height = 400;
let style = "darkMode";

let defaultNetwork = {"nodes": [{"id": "stakeholders", "name": "Stakeholders", "group": "root", "type": "none"}], "links": []};
let link, node, text;
let simulation;

const shapeData = [{"group": "root"},
                    {"group": "stakeholder"},
                    {"group": "value"}]

const fillData = [{"group": "direct"},
                  {"group": "indirect"},
                  {"group": "excluded"}]

export function symbolType(d) {

    if (d.group === "root") {
        return d3.symbolCircle;
    } else if(d.group === "stakeholder") {
        return d3.symbolTriangle;
    } else {
        return d3.symbolSquare;
    }
}

function transform(d) {
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

const opacityScale = d3.scaleOrdinal()
    .domain(["none", "direct", "indirect", "excluded"])
    .range([1, 1, .7, .5])

function stakeholderType(d) {

    if(d.type !== "none" && d.group === "value") {
        return `Value: ${d.name}`;
    } else if(d.type !== "none" && d.group === "stakeholder") {
        return `${d.id}: ${d.type} stakeholder`;
    } else {
        return "";
    }
}

function renderTooltip() {
    var tooltip = d3.select(`#${chartId} .tooltip`);

    d3.selectAll(".network-nodes").on("mouseover", function (e, d) {

        var cx = d.x + 20;
        var cy = d.y - 10;

        let thisCircle = d3.select(this);

        thisCircle
            .attr("stroke-width", 2)
            .attr("stroke", visStyles[style]["secondaryHighlightColor"]);

        let type = stakeholderType(d);

        tooltip.style("visibility", "visible")
            .style("left", cx + "px")
            .style("top", cy + "px")
            .html(type);

    }).on("mouseout", function () {
        tooltip.style("visibility", "hidden");

        d3.selectAll(".network-nodes")
            .attr("stroke", "none");

    });
}

function initNetwork(data) {
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
        .attr("stroke", visStyles[style]["linkColor"])
        .attr("stroke-width", visStyles[style]["linkWidth"])
        .attr("cursor", "default")
        .selectAll("circle");

    text = svg.append("g")
        .selectAll("text");

    simulation = d3.forceSimulation()
        .force("charge", d3.forceManyBody().strength(-300))
        .force("link", d3.forceLink().id(d => d.id).distance(25))
        .force("center", d3.forceCenter(width / 2, height / 2).strength(.01))
        .force("collide", d3.forceCollide().strength(10).radius(8))
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

    updateNetwork(data);
}

function updateNetwork(data) {

    let svg = d3.select(`#${chartId} svg`);

    node = node
      .data(data.nodes, d => d.id)
      .join(enter => enter.append("path")
                .attr("class", d => d.group === "root"? "network-nodes node": "network-nodes")
                .attr("opacity", d => opacityScale(d.type)))
                .attr("fill", visStyles[style]["warningColor"])
                .attr("d", d3.symbol()
                .type(((d) => symbolType(d)))
                .size(d => d.group === "root"? 350: 100)
                )
        .call(drag);

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

    renderTooltip();
}

function initShapeLegend() {

    let height = 40;

    d3.select(`#${legendId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    drawShapeLegend();
}

function drawShapeLegend() {

    let svg = d3.select(`#${legendId} svg`)
    let h = 40;

    let shape = svg.append("g")
           .selectAll("circle")
           .data(shapeData, d => d.group)
           .enter()
           .append("g")
           .attr("transform", (d, i) => `translate(${(i * 70) + 50}, ${h / 3})`)

    shape.append("path")
        .attr("d", d3.symbol()
            .type(((d) => symbolType(d)))
            .size(100))
        .attr("fill", visStyles[style]["textColor"]);

    // Add a text element to the previously added g element.
    shape.append("text")
          .attr("text-anchor", "middle")
          .attr("y", 20)
          .text(d => d.group)
          .attr("fill", visStyles[style]["textColor"])
          .attr("font-size", visStyles[style]["fontSize"]);

    let color = svg.append("g")
          .selectAll("circle")
          .data(fillData, d => d.group)
          .enter()
          .append("g")
          .attr("transform", (d, i) => `translate(${(i * 70) + 300}, ${h / 3})`)

    color.append("path")
       .attr("d", d3.symbol()
           .type(d3.symbolTriangle)
           .size(100))
       .attr("fill", visStyles[style]["warningColor"])
       .attr("opacity", d => opacityScale(d.group));

    color.append("text")
       .attr("text-anchor", "middle")
       .attr("y", 20)
       .text(d => d.group)
       .attr("fill", visStyles[style]["textColor"])
       .attr("font-size", visStyles[style]["fontSize"]);
}

function StakeholderNetwork(data, setData) {

    const resetNetwork = () => {
        setData(defaultNetwork)
    }

    useEffect(() => {
        initNetwork(data);
        initShapeLegend();
    }, [])

    useEffect(() => {
        updateNetwork(data);
    }, [data])

    return(
        <div className="Container">
            <h3>stakeholder mapping</h3>
            <div id={chartId} className='Card-Group'></div>
            <div id={legendId} className='Card-Group'>
                <h4>legend</h4>
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

function AddStakeholder(data, setData, stakeholderIdArray) {

    const [stakeholderName, updateStakeholderName] = useState("");
    const [stakeholderGroup, updateStakeholderGroup] = useState("direct");
    const [stakeholderValues, updateStakeholderValues] = useState([]);
    let checkedValues = [];

    // console.log(checkedValues)

    const setStakeholder = ev => {
        updateStakeholderName(ev.target.value);
    }

    const setStakeholderGroup = ev => {
        updateStakeholderGroup(ev.target.value);
    }

    const setStakeholderValues = ev => {

        let value = ev.target.value;
        let checked = ev.target.checked;

        checkedValues.push(value)

        if(!stakeholderValues.includes(value) && checked) {
            stakeholderValues.push(value)
        } else if(!checked) {
            const index = stakeholderValues.indexOf(value);
            if (index > -1) {
                stakeholderValues.splice(index, 1);
            }
        }
    }

    const add = () => {

        let dataNew = Object.assign({}, data);

        let stakeholder = {"id": stakeholderName,
                           "name": stakeholderName,
                           "group": "stakeholder",
                           "type": stakeholderGroup};

        dataNew.nodes.push(stakeholder);

        for (let i of stakeholderValues) {

            if (!stakeholderIdArray.includes(i)) {
                stakeholderIdArray.push(i)
                dataNew.nodes.push({"id": i,
                                    "name": i,
                                    "group": "value",
                                    "type": stakeholderGroup});

                dataNew.links.push({"source": "stakeholders", "target": i});
            }

            dataNew.links.push({"source": i, "target": stakeholderName});
        }

        setData(dataNew)

        updateStakeholderName("");
        updateStakeholderGroup("direct");
        updateStakeholderValues([]);

        // d3.selectAll(".Value-Check input")
        //     .attr("checked", false)
    }

    return(
        <div className="Stakeholder-Attr Container">
            <h3>add stakeholder</h3>
            <div className="Card-Group">
                <h4>stakeholder group</h4>
                <TextField value={stakeholderName} placeholder="Stakeholder group name" variant="outlined" onChange={setStakeholder}/>
            </div>
            <div className="Card-Group">
                <FormControl>
                    <h4>stakeholder type</h4>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="direct"
                        name="radio-buttons-group"
                        onChange={setStakeholderGroup}
                        value={stakeholderGroup}
                    >
                        <FormControlLabel value="direct" control={<Radio />} label="Direct" />
                        <FormControlLabel value="indirect" control={<Radio />} label="Indirect" />
                        <FormControlLabel value="excluded" control={<Radio />} label="Excluded" />
                    </RadioGroup>
                </FormControl>
            </div>
            <div className="Card-Group">
                <h4>stakeholder values</h4>
                <FormGroup>
                    <div>
                        {values.map(el => <FormControlLabel key={el} 
                            control={<Checkbox value={el} className="Value-Check" onClick={setStakeholderValues} />} label={el} />)}
                    </div>
                </FormGroup>
            </div>
            <div className="Add-Stakeholder-Button">
                <h4>add stakeholder to diagram</h4>
                <Fab color="primary" onClick={add}>
                    <AddIcon />
                </Fab>
            </div>
        </div>
    )
}

export default function StakeholderMapping() {

    const [data, setData] = useState(defaultNetwork);
    const [stakeholderIdArray, updateStakeholderIdArray] = useState(['stakeholders']);

    return(
        <div className="Content One-Column-Three No-Padding-Top">
            <div className="">
                {AddStakeholder(data, setData, stakeholderIdArray)}
            </div>
            <div className="">
                {StakeholderNetwork(data, setData)}
            </div>
        </div>
    )
}
