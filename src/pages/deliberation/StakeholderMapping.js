import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Overlay from "../../components/Overlay";
import { policyDiagram } from '../../components/PolicyDiagram';
import { Terminology, Term } from '../../components/Terminology';
import { terms } from '../../utils/global';
import Progress from "../../components/Progress";
import { PolicyScenario } from "../../components/PolicyScenario";
import { Fab, Button, FormControl, RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox, TextField } from '@material-ui/core';
import * as d3 from 'd3';
import { BackButton, NextButton } from '../../components/Button';
import { LeftSideBar, RightSideBar } from "../../components/Sidebar";
import AddIcon from '@material-ui/icons/Add';
import { visStyles } from "../../utils/global";

let values = ["Freedom", "Autonomy", "Privacy", "Security", "Safety", "Anonymity", "Reliability", "Trust", "Ownership and property",
"Informed consent", "Identity", "Environment sustainability", "Other"];

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

const fillScale = d3.scaleOrdinal()
    .domain(["none", "primary", "secondary", "tertiary"])
    .range([ visStyles[style]["fillColor"], "#9A00FF", "#F50141", "#FE4002"])

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

    d3.selectAll(".nodes").on("mouseover", function (e, d) {

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

        d3.selectAll(".nodes")
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
                .attr("class", "node nodes")
                .attr("fill", d => fillScale(d.type)))
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

    let height = 100;

    d3.select(`#${legendId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    drawShapeLegend();
}

function drawShapeLegend() {

    let svg = d3.select(`#${legendId} svg`)

    svg
        .selectAll("path")
        .data(shapeData, d => d.type)
        .join(
            enter  => enter
                .append("path")
                .attr("d", d3.symbol()
                .type(((d) => symbolType(d)))
                    .size(100))
                .attr("transform", function(d, i) {
                    return 'translate(' + (i*50 + 15) + ', ' + 10 + ')';
                })
                .attr("fill", visStyles[style]["textColor"])
        );

    svg
        .selectAll("text")
        .data(shapeData, d => d.type)
        .join(
            enter  => enter
                .append("text")
                .attr("y", 25)
                .attr("x", ((d, i) => i*50 + 20))
                .attr("fill", visStyles[style]["textColor"])
                .text((d) => d.group)
        );
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
            <div id={legendId} className='Card-Group'></div>
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

export function Content() {

    const [data, setData] = useState(defaultNetwork);
    const [stakeholderIdArray, updateStakeholderIdArray] = useState(['stakeholders']);

    return(
        <div className="Content One-Column-Three">
            <div className="">
                {AddStakeholder(data, setData, stakeholderIdArray)}
            </div>
            <div className="">
                {StakeholderNetwork(data, setData)}
            </div>
        </div>
    )
}

function AddStakeholder(data, setData, stakeholderIdArray) {

    const [stakeholderName, updateStakeholderName] = useState("");
    const [stakeholderGroup, updateStakeholderGroup] = useState("primary");
    const [stakeholderValues, updateStakeholderValues] = useState([]);
    let checkedValues = []

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
        updateStakeholderGroup("primary");
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
                        defaultValue="primary"
                        name="radio-buttons-group"
                        onChange={setStakeholderGroup}
                        value={stakeholderGroup}
                    >
                        <FormControlLabel value="primary" control={<Radio />} label="Primary" />
                        <FormControlLabel value="secondary" control={<Radio />} label="Secondary" />
                        <FormControlLabel value="tertiary" control={<Radio />} label="Tertiary" />
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

export default function StakeholderMapping({config, modules, policy, setPolicy}) {

    const [isOpen, setIsOpen] = useState(true);
    const [id, setId] = useState("deliberation");
    let navigate = useNavigate();
    let chartID = "Policy-Chart3";

    const routeNext = () => {
        let path = `/Risk`; 
        navigate(path);
    }
  
    const routeBack = () => {
        let path = `/COMPAS`; 
        navigate(path);
    }

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setId(isOpen ? "deliberation": "stakeholders");
    }, [isOpen])

    useEffect(() => {
        policyDiagram(chartID, 480, 480, "colorMode", false);
    }, []);

    return (
        <div className="App"> {
            isOpen ?
            <Overlay isOpen={isOpen} onClose={toggleOverlay}>
            <div className="Containers-Container">
                <div className="Container-Fill-Secondary">
                    <div className="Overlay-Controls">
                        <h3 className="Page-Title">introduction to deliberation</h3>
                        <button
                            className="Overlay-Close"
                            type="button"
                            onClick={toggleOverlay}
                        />
                    </div>
                    <p>Many algorithms intervening in public policy decisions are considered high-stakes decision-making cases (e.g., predict child maltreatment, automated recruitment decisions, college admissions), but not all are. The last module showed two examples of algorithmically informed decision-making use cases. The goal of this module is to visually assess risk across numerous dimensions to answer the question, <span className="Italic">is it appropriate to use algorithmic decision-making for my specific public policy use case?</span></p>
                    <div id={chartID} className="chart"></div>
                    <h6 className="Small-Margin">Visualization showing changing risk levels of policy decisions where algorithmically informed-decision making is currently in use. Visualization data created from examples in <NavLink to="/Resources">O'Neil (2016) AINOW (2018), Eubanks (2018), and Obermeyer et al. (2019)</NavLink>.</h6>
                </div>
            </div>
        </Overlay>:
        <></>
        }
        <Header/>
        <div className="Main">
            <LeftSideBar>
                <Description config={config}/>
                <Terminology>
                    <Term term={terms['stakeholders']}/>
                </Terminology>
                <BackButton routeBack={routeBack}/>
            </LeftSideBar>
            <Content />
            <RightSideBar>
                <Progress id={id} modules={modules}/>
                <PolicyScenario policy={policy} setPolicy={setPolicy}/>
                <NextButton routeNext={routeNext}/>
            </RightSideBar>
        </div>
        <Footer/>
    </div>
    )
}
