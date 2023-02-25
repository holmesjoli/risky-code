import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Overlay from "../../components/Overlay";
import { policyDiagram } from '../../components/PolicyDiagram';
import Terminology from '../../components/Terminology';
import Progress from "../../components/Progress";
import PolicyScenario from "../../components/PolicyScenario";
import { Fab, Button, FormControl, RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox, TextField } from '@material-ui/core';
import * as d3 from 'd3';
import { BackButton, NextButton } from '../../components/Button';
import { LeftSideBar, RightSideBar } from "../../components/Sidebar";
import AddIcon from '@material-ui/icons/Add';
import { visStyles } from "../../utils/global";

let values = ["Freedom", "Autonomy", "Privacy", "Security", "Safety", "Anonymity", "Reliability", "Trust", "Ownership and property",
"Informed consent", "Identity", "Environment sustainability", "Other"];

let chartId = "Stakeholder-Mapping-Diagram";
let width = 650;
let height = 400;
let style = "darkMode";

function initNetwork() {
    d3.select(`#${chartId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("border")
}

const rScale = d3.scaleOrdinal()
    .domain(["stakeholders", "stakeholder", "value"])
    .range([10, 8, 5])

function renderNetwork(nodes, links) {

    console.log(nodes, links)

    let svg = d3.select(`#${chartId} svg`)

    var simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(function (d) { return d.id; }).distance(10).strength(2))
        .force("charge", d3.forceManyBody().strength(-20))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide().radius(15));

    var link = svg.append("g")
        .selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .attr("stroke", visStyles[style]["linkColor"])
        .attr("stroke-width", visStyles[style]["linkWidth"]);

    var node = svg.append("g")
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", d => rScale(d.group))
        .attr("stroke", visStyles[style]["linkColor"])
        .attr("stroke-width", visStyles[style]["linkWidth"]);

    var text = svg.append("g")
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .attr("fill", visStyles[style]["textColor"])
        .attr("font-size", visStyles[style]["fontSize"])
        .text(d => d.name);
        
    simulation.on("tick", function () {
        link.attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; })

            // .attr("stroke-width", function(d) {return strokeScale(d.weight); });

        node
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; })
            // .attr("fill", function(d) { return colorScale(d.zone); })
            // .attr("r", function(d) { return sizeScale(d.influence); })
            // .attr("stroke", "grey");

        text
            .attr("x", function (d) { return d.x + 20; })
            .attr("y", function (d) { return d.y - 10; })
    });
}

function StakeholderNetwork(nodes, links) {

    const resetNetwork = () => {

    }

    useEffect(() => {
        initNetwork();
    }, [])

    useEffect(() => {
        renderNetwork(nodes, links);
    }, [nodes, links])

    return(
        <div className="Container">
            <h3>stakeholder mapping</h3>
            <div id="Stakeholder-Mapping-Diagram"></div>
            <Button variant="outlined" color="secondary" onClick={resetNetwork}>reset network</Button>
        </div>
    )
}

function AddStakeholder(nodes, links) {

    const [stakeholderName, updateStakeholderName] = useState("");
    const [stakeholderGroup, updateStakeholderGroup] = useState("primary");
    const [stakeholderValues, updateStakeholderValues] = useState([]);

    const setStakeholder = ev => {
        updateStakeholderName(ev.target.value);
    }

    const setStakeholderGroup = ev => {
        updateStakeholderGroup(ev.target.value);
    }

    const setStakeholderValues = ev => {

        let value = ev.target.value;
        let checked = ev.target.checked;

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

        let stakeholder = {"id": stakeholderName,
                           "name": stakeholderName,
                           "group": "stakeholder"};

        nodes.push(stakeholder);

        for (let i of stakeholderValues) {

            nodes.push({"id": i,
                        "name": i,
                        "group": "value"});

            links.push({"source": stakeholderName, "target": i});
        }

        updateStakeholderName("");
        updateStakeholderGroup("primary");
        updateStakeholderValues([]);
    }

    return(
        <div className="Stakeholder-Attr Container">
            <h3>add stakeholder</h3>
            <div className="Card-Group">
                <h4>stakeholder group</h4>
                <TextField value={stakeholderName} placeholder="add the stakeholder group name" variant="outlined" onChange={setStakeholder}/>
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
                            control={<Checkbox value={el} onClick={setStakeholderValues} />} label={el} />)}
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

export function Content({direct, setDirect, indirect, setIndirect}) {

    // const updateDirectStakeholders = (event) => {
    //     setDirect(event.target.value)
    // }

    // const updateIndirectStakeholders = (event) => {
    //     setIndirect(event.target.value)
    // }

    const [links, setLinks] = useState([]);
    const [nodes, setNodes] = useState([{"id": "stakeholders", "name": "Stakeholders", "group": "root"}]);

    return(
        <div className="Content One-Column-Three">
            <div className="">
                {AddStakeholder(nodes, links)}
            </div>
            <div className="">
                {StakeholderNetwork(nodes, links)}
            </div>
        </div>
    )
}

export default function StakeholderMapping({config, modules, direct, setDirect, indirect, setIndirect, policy, setPolicy}) {

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
                    <div className="Container-Rule">
                        <h4>stakeholders</h4>
                        <p>People impacted directly or indirectly by a system <NavLink to="/Resources">(Bender and Friedman 2018)</NavLink></p>
                    </div>
                </Terminology>
                <BackButton routeBack={routeBack}/>
            </LeftSideBar>
            <Content direct={direct} setDirect={setDirect} indirect={indirect} setIndirect={setIndirect}/>
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
