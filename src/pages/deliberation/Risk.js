import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Progress from "../../components/Progress";
import { PolicyScenario } from "../../components/TrackUserInputs";
import { BackButton, NextButton } from '../../components/Button';
import { LeftSideBar, RightSideBar, Description, Terminology, Term } from "../../components/Sidebar";
import { terms } from '../../utils/global';
import { RoleShort } from "../../components/Role";
import { visStyles } from "../../utils/global";
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { initNetwork, updateNetwork } from '../../components/StakeholderMapping';

let chartId = "Risk-Chart";
let legendId = "Risk-Legend";
let stakeholderId = "Risk-Stakeholder";

let width = 550;
let height = 200;
let style = "darkMode";
let margin = {left: 10, right: 10, top: 10, bottom: 40};
// let node;

const xScale = d3.scaleLinear()
    .domain([1, 5])
    .range([margin.left, width-margin.right]);

const yScale = d3.scaleLinear()
    .domain([0, 10])
    .range([height-margin.bottom, margin.top]);

const fillScale = d3.scaleOrdinal()
    .domain([5, 4, 3, 2, 1])
    .range(["#9A00FF", "#F50141", "#FE4002", "#FD7B03", "#F3C010"]);

let simulation = d3.forceSimulation()
    .force('center', d3.forceCenter(width / 2, height / 2)) // pull nodes to a central point
    .force('x', d3.forceX().x(function (d) {
        return xScale(d.value);
    }).strength(1))
    .force('y', d3.forceY().y(function (d) {
        return height/2;
    }).strength(4))
    .force('charge', d3.forceManyBody().strength(1)) // send nodes away from eachother
    // .force('collision', d3.forceCollide().radius(function (d) { // prevent circle overlap when collide
    //     return rScale(d.Cocoa_Percent);
    // }).strength(1))



function symbolScale(d) {

    if(d === "direct") {
        return d3.symbolCircle;
    } else if (d === "indirect") {
        return d3.symbolSquare;
    } else  {
        return d3.symbolTriangle;
    }
}

function initGraph(chartId, data) {

    let svg = d3.select(`#${chartId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.select(`#${chartId}`)
        .append("div")
        .attr("class", "tooltip");

    const xAxis = svg.append("g")
        .attr("class", "axis")
        .attr("transform",`translate(0,${height-margin.bottom})`)
        .attr("color", visStyles[style]["textColor"])
        .call(d3.axisBottom().scale(xScale).tickFormat(d3.format("Y")));

    svg.append("text")
        .attr("class","axisLabel")
        .attr("x", (width - margin.left - margin.right)/2 + margin.left)
        .attr("y", height - 5)
        .attr("text-anchor","middle")
        .text("Overall risk")
        .attr("fill", visStyles[style]["textHighlightColor"])
        .attr("font-size", 12)
        .attr("letter-spacing", visStyles[style]["letterSpacing"]);

    renderGraph(chartId, data);
}

function renderGraph(chartId, data) {

    let svg = d3.select(`#${chartId} svg`);
    svg.append("g").attr("class", "nodes");

    console.log(data)

    let data2 = [{id: "blah", x: 1, y:2, value: 1, stakeholderType: "indirect"},
                {id: "blah2", x: 3, y:2, value: 3, stakeholderType: "direct"}
    ];

    svg.selectAll("symbol")
        .data(data2, d => d.id)
        .join(
            enter  => enter
            .append("path")
                .attr("d", d3.symbol()
                    .type(d => symbolScale(d.stakeholderType))
                    .size(100))
                .attr("transform", transform)
                .attr("fill", d => fillScale(d.value))
        )

    function transform(d) {
        return "translate(" + xScale(d.value) + "," + yScale(d.y) + ")";
    }

    // let dataNew2 = [];

    // data.map(d => d.risks? d.risks.map(i => dataNew2.push(i)): d);

    // if (dataNew2.length > 0) {

    //     // simulation.alpha(1).restart();

    //     // simulation
    //     //     .nodes(dataNew2)
    //     //     .on("tick", ticked);

    //     // function ticked() {
    //     //     node.attr("transform", transform)
    //     // }

    // }
}

function initStakeholder(stakeholderId, data) {

    let height = 200, width = 280;

    initNetwork(stakeholderId, width, height, data);
}

function RiskLevel({title, handleChange, children}) {

    const marks = [
        {
          value: 1,
          label: 'Low',
        },
        {
          value: 3,
          label: 'Medium',
        },
        {
          value: 5,
          label: 'High',
        }
    ];

    return (
        <div className="Container2 Small-Padding-Bottom">
            <h4 className="Small-Margin Semi-Bold">{title}</h4>
            {children}
            <div className="Padding-Left Padding-Right">
                  <Slider
                  size="small"
                  defaultValue={3}
                  min={1}
                  max={5}
                  step={1}
                  aria-label="Small"
                  marks={marks}
                  valueLabelDisplay="auto"
                  onChange={handleChange}
              />
            </div>
        </div>
    );
}

export function Content({sid, stakeholderData, setStakeholderData}) {

    const [appropriateDataUse, setAppropriateDataUse] = useState(3);
    const updateAppropriateDataUse = (event, value) => {
        setAppropriateDataUse(value)
    };

    const [accountability, setAccountability] = useState(3);
    const updateAccountability = (event, value) => {
        setAccountability(value)
    };

    const [technical, setTechnical] = useState(3);
    const updateTechnical = (event, value) => {
        setTechnical(value)
    };

    const [stakeholderValues, setStakeholderValues] = useState(3);
    const updateStakeholderValues = (event, value) => {
        setStakeholderValues(value)
    };

    const add = () => {

        if (stakeholderData !== undefined) {
            let dataNew = Object.assign({}, stakeholderData);
            let risks = [
                {"id": `${stakeholderData.id}-accountability`, "value": accountability, "type": "accountability", "stakeholderType": stakeholderData.stakeholderType, "y": sid},
                {"id": `${stakeholderData.id}-stakeholderValues`, "value": stakeholderValues, "type": "stakeholder values", "stakeholderType": stakeholderData.stakeholderType, "y": sid},
                {"id": `${stakeholderData.id}-technical`, "value": technical, "type": "technical", "stakeholderType": stakeholderData.stakeholderType, "y": sid},
                {"id": `${stakeholderData.id}-appropriateDataUse`, "value": appropriateDataUse, "type": "appropriate data use", "stakeholderType": stakeholderData.stakeholderType, "y": sid}
            ]

            dataNew.risks = risks;
            setStakeholderData([dataNew])
        }
    }

    return(
        <div className="Content No-Padding-Top">
            <div className="Container Margin-Bottom">
                <div className="One-Column-Three Margin-Bottom">
                    <div className="Container2">
                        <div className="Add-Stakeholder-Button">
                            <div id={stakeholderId} className="Small-Margin-Bottom"></div>
                            <h4 className="Small-Margin">add stakeholder to diagram</h4>
                            <Fab color="primary" onClick={add}>
                                <AddIcon />
                            </Fab>
                        </div>
                    </div>
                    <div className="Slider-Container">
                        <RiskLevel title="risk of appropriate data use" handleChange={updateAppropriateDataUse}>
                            <ul>
                                <Tooltip title="Consider if citizen data is used and if citizens opted into data collection">
                                    <li className="Extra-Small-Margin-Bottom">Risk of <span className="Emphasis">citizen data use</span></li>
                                </Tooltip>
                                <Tooltip title="Consider the purposes and context under which the data was obtained">
                                    <li className="Extra-Small-Margin-Bottom">Risk of <span className="Emphasis">data compatability</span></li>
                                </Tooltip>
                            </ul>
                        </RiskLevel>
                        <RiskLevel title="risk of technical bias" handleChange={updateTechnical}>
                            <ul>
                                <Tooltip title="Consider representativeness of data, sample bias, data quality.">
                                    <li className="Extra-Small-Margin-Bottom">Risk of <span className="Emphasis">technical bias</span></li>
                                </Tooltip>
                                <Tooltip title="Consider if there is a match between the real world and the captured data.">
                                    <li className="Extra-Small-Margin-Bottom">Risk of <span className="Emphasis">proxy variables</span></li>
                                </Tooltip>
                            </ul>
                        </RiskLevel>
                        <RiskLevel title="risk of stakeholder values" handleChange={updateStakeholderValues}>
                            <ul>
                                <Tooltip title="Consider stakeholder values such as loss of life, liberty, or property">
                                    <li className="Extra-Small-Margin-Bottom">Risk of <span className="Emphasis">serious stakeholder harm</span></li>
                                </Tooltip>
                                <Tooltip title="Consider bias from racism, discrimination, class, gender, etc.">
                                    <li className="Extra-Small-Margin-Bottom">Risk of <span className="Emphasis">historic societal bias</span></li>
                                </Tooltip>
                            </ul>
                        </RiskLevel>
                        <RiskLevel title="risk of accountability" handleChange={updateAccountability}>
                            <ul>
                                <Tooltip title="Consider if the algorithm can be explained to lay users or only expert users">
                                    <li className="Extra-Small-Margin-Bottom">Risk of <span className="Emphasis">lack of algorithmic explainability</span></li>
                                </Tooltip>
                                <Tooltip title="Consider data and algorithm access">
                                    <li className="Extra-Small-Margin-Bottom">Risk of <span className="Emphasis">lack of algorithmic auditability</span></li>
                                </Tooltip>
                                <Tooltip title="Consider the degree (low, medium, high) of automation in decision-making.">
                                    <li className="Small-Extra-Small-Margin-Bottom">Risk of <span className="Emphasis">automation</span></li>
                                </Tooltip>
                            </ul>
                        </RiskLevel>
                    </div>
                </div>
                <div className="Container2 One-Column-Three No-Margin-Bottom No-Padding-Bottom">
                    <div>
                        <h4 className="No-Margin-Bottom">legend</h4>
                        <div id={legendId} className="Small-Margin-Bottom"></div>
                    </div>
                    <div>
                        <h4 className="No-Margin-Bottom">visualize</h4>
                        <div id={chartId} className="chart"></div>
                    </div>
                    <h6 className="Small-Margin-Top"></h6>
                </div>
            </div>
        </div>
    )
}

export default function Risk({config, modules, policy, setPolicy, stakeholderData, setStakeholderData}) {

    let navigate = useNavigate();

    let sid = 0;

    const routeNext = () => {
        let path = `/Decision`; 
        navigate(path);
    }

    const routeBack = () => {
        let path = `/Policy`;
        navigate(path);
    }

    useEffect(() => {
        initGraph(chartId, stakeholderData);
        initStakeholder(stakeholderId, stakeholderData[sid]);
    }, []);

    useEffect(() => {
        renderGraph(chartId, stakeholderData)
    }, [stakeholderData])

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <LeftSideBar>
                    <Description config={config}>
                        <p>Use the sliders to adjust the risks for each stakeholder you identified on the stakeholder mapping page</p>
                    </Description>
                    <RoleShort moduleName="deliberation"/>
                    <Terminology margin="Margin-Large-Bottom">
                        <Term term={terms['proxy-variable']}/>
                    </Terminology>
                    <BackButton routeBack={routeBack}/>
                </LeftSideBar>
                <Content sid={sid} stakeholderData={stakeholderData[sid]} setStakeholderData={setStakeholderData}/>
                <RightSideBar>
                    <Progress id={config.id} modules={modules}/>
                    <PolicyScenario policy={policy} setPolicy={setPolicy}/>
                    <NextButton routeNext={routeNext}/>
                </RightSideBar>
            </div>
            <Footer/>
        </div>
    )
}
