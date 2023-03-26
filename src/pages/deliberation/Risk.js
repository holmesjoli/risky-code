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
import { initNetwork } from '../../components/StakeholderMapping';
import { initStakeholderLegend, symbolScale } from '../../components/StakeholderMapping';

let chartId = "Risk-Chart";
let legendStakeholderId = "Risk-Stakeholder-Legend";
let legendRiskId = "Risk-Legend";
let stakeholderId = "Risk-Stakeholder";

let width = 550;
let height = 400;
let style = "darkMode";
let margin = {left: 10, right: 10, top: 10, bottom: 40};

const xScale = d3.scaleLinear()
    .domain([1, 5])
    .range([margin.left, width-margin.right]);

const yScale = d3.scaleLinear()
    .domain([1, 4])
    .range([height-margin.bottom, margin.top]);

const fillScale = d3.scaleOrdinal()
    .domain([5, 4, 3, 2, 1])
    .range(["#9A00FF", "#ea21ad", "#F50141", "#FE4002", "#FD7B03"]);

let simulation = d3.forceSimulation()
    .force('center', d3.forceCenter(width / 2, height / 2)) // pull nodes to a central point
    .force('x', d3.forceX().x(function (d) {
        return xScale(d.value);
    }).strength(1))
    .force('y', d3.forceY().y(function (d) {
        return yScale(d.yValue);
    }).strength(1))
    .force('charge', d3.forceManyBody().strength(1)) // send nodes away from eachother
    .force('collision', d3.forceCollide().radius(6).strength(1))

export function initRiskLegend(legendStakeholderId) {

    let height = 40;

    d3.select(`#${legendStakeholderId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    drawRiskLegend(legendStakeholderId);
}

export function drawRiskLegend(legendId) {
    
    const fillData = [{"fill": 1, "name": "Low"},
                        {"fill": 2, "name": ""},
                        {"fill": 3, "name": "Medium"},
                        {"fill": 4, "name": ""},
                        {"fill": 5, "name": "High"}]
    
    let svg = d3.select(`#${legendId} svg`)
    let h = 40;

    let shape = svg.append("g")
        .selectAll("path")
            .data(fillData, d => d.fill)
            .enter()
            .append("g")
        .attr("transform", (d, i) => `translate(${(i * 60) + 30}, ${h / 3})`)

    shape.append("path")
        .attr("d", d3.symbol()
            .type(((d) => symbolScale(d.fill)))
            .size(100))
        .attr("fill", d=>fillScale(d.fill));

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

    svg.select(".axis")
        .append("text")
        .attr("class", "axisLabel")
        .attr("x", (width - margin.left - margin.right)/2 + margin.left)
        .attr("y", margin.bottom)
        .attr("text-anchor","middle")
        .text("Overall risk")
        .attr("fill", visStyles[style]["textHighlightColor"])
        .attr("font-size", 12)
        .attr("letter-spacing", visStyles[style]["letterSpacing"]);

    renderGraph(chartId, data);
}

function renderTooltip(chartId) {
    var tooltip = d3.select(`#${chartId} .tooltip`);

    d3.selectAll(".stakeholder-risk-network-node")
        .on("mouseover", function (e, d) {

        let thisCircle = d3.select(this);
        var x = xScale(d.value) + 20;
        var y = yScale(d.yValue) - 10;

        thisCircle
            .attr("stroke-width", 2)
            .attr("stroke", visStyles[style]["secondaryHighlightColor"]);

        tooltip.style("visibility", "visible")
            .style("left", x + "px")
            .style("top", y + "px")
            .html(`${d.name}: ${d.type}`);

    }).on("mouseout", function () {
        tooltip.style("visibility", "hidden");

        d3.selectAll(".stakeholder-risk-network-node")
            .attr("stroke", "none");
    });
}


function renderGraph(chartId, data) {

    let svg = d3.select(`#${chartId} svg`);
    svg.append("g").attr("class", "nodes");

    console.log(data)

    if (data !== undefined) {

        let node = svg
            .select(".nodes").selectAll("symbol")
            .data(data, d => d.id)
            .join(
                enter  => enter
                .append("path")
                    .attr("d", d3.symbol()
                        .type(d => symbolScale(d.stakeholderType))
                        .size(100))
                    .attr("transform", transform)
                    .attr("fill", d => fillScale(d.value))
                    .attr("class", "stakeholder-risk-network-node"),
                update => update
                    .attr("transform", transform)
                    .attr("fill", d => fillScale(d.value)),
                exit => exit
            )

        simulation.alpha(1).restart();

        simulation
            .nodes(data)
            .on("tick", ticked);

        function ticked() {
            node.attr("transform", transform)
        }

        function transform(d) {
            return "translate(" + xScale(d.value) + "," + yScale(d.yValue) + ")";
        }

        renderTooltip(chartId);
    }
}

function initStakeholder(stakeholderId, data) {

    let height = 135, width = 280;

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
                    className="Yellow"
              />
            </div>
        </div>
    );
}

function Content({sid, stakeholderData, data, setData}) {

    console.log(data)

    return(
        <div className="Content No-Padding-Top">
            <div className="Container">
                <div className="One-Column-Three">
                    <AddRisks stakeholderData={stakeholderData} data={data} setData={setData}/>
                    <RiskNetwork/>
                </div>
            </div>
        </div>
    )
}

const Sliders = ({updateAppropriateDataUse, updateTechnical, updateStakeholderValues, updateAccountability}) => {
    return(
        <div className="Slider-Container">
                <RiskLevel title="appropriate data use risks" handleChange={updateAppropriateDataUse}>
                    <Tooltip title="Consider if citizen data is used and if citizens opted into data collection">
                        <p className="Extra-Small-Margin-Bottom"><span className="Emphasis">Citizen data use</span></p>
                    </Tooltip>
                    <Tooltip title="Consider the purposes and context under which the data was obtained">
                        <p className="Extra-Small-Margin-Bottom"><span className="Emphasis">Data compatability</span></p>
                    </Tooltip>
                </RiskLevel>
                <RiskLevel title="technical bias risks" handleChange={updateTechnical}>
                    <Tooltip title="Consider representativeness of data, sample bias, data quality.">
                        <p className="Extra-Small-Margin-Bottom"><span className="Emphasis">Technical bias</span></p>
                    </Tooltip>
                    <Tooltip title="Consider if there is a match between the real world and the captured data.">
                        <p className="Extra-Small-Margin-Bottom"><span className="Emphasis">Proxy variables</span></p>
                    </Tooltip>
                </RiskLevel>
                <RiskLevel title="stakeholder values risks" handleChange={updateStakeholderValues}>
                    <Tooltip title="Consider stakeholder values such as loss of life, liberty, or property">
                        <p className="Extra-Small-Margin-Bottom"><span className="Emphasis">Serious stakeholder harm</span></p>
                    </Tooltip>
                    <Tooltip title="Consider bias from racism, discrimination, class, gender, etc.">
                        <p className="Extra-Small-Margin-Bottom"><span className="Emphasis">Historical and societal bias</span></p>
                    </Tooltip>
                </RiskLevel>
                <RiskLevel title="accountability risks" handleChange={updateAccountability}>
                    <Tooltip title="Consider if the algorithm can be explained to lay users or only expert users">
                        <p className="Extra-Small-Margin-Bottom"><span className="Emphasis">Explainability</span></p>
                    </Tooltip>
                    <Tooltip title="Consider data and algorithm access">
                        <p className="Extra-Small-Margin-Bottom"><span className="Emphasis">Auditability</span></p>
                    </Tooltip>
                    <Tooltip title="Consider the degree (low, medium, high) of automation in decision-making.">
                        <p className="Small-Extra-Small-Margin-Bottom"><span className="Emphasis">Automation</span></p>
                    </Tooltip>
                </RiskLevel>
            </div>
    )
}

function AddRisks({stakeholderData, data, setData}) {

    const [appropriateDataUse, setAppropriateDataUse] = useState(3);
    const updateAppropriateDataUse = (event, value) => {
        setAppropriateDataUse(value)
    };

    const [technical, setTechnical] = useState(3);
    const updateTechnical = (event, value) => {
        setTechnical(value)
    };

    const [stakeholderValues, setStakeholderValues] = useState(3);
    const updateStakeholderValues = (event, value) => {
        setStakeholderValues(value)
    };

    const [accountability, setAccountability] = useState(3);
    const updateAccountability = (event, value) => {
        setAccountability(value)
    };

    const add = () => {

        let dataNew = Object.assign([], data);

        if (stakeholderData !== undefined) {

            dataNew.push({"id": `${stakeholderData.id}-accountability`, "name": stakeholderData.name,  "value": accountability, "type": "accountability", "stakeholderType": stakeholderData.stakeholderType, "yValue": 1})
            dataNew.push({"id": `${stakeholderData.id}-stakeholderValues`, "name": stakeholderData.name, "value": stakeholderValues, "type": "stakeholder values", "stakeholderType": stakeholderData.stakeholderType, "yValue": 2})
            dataNew.push({"id": `${stakeholderData.id}-technical`, "name": stakeholderData.name, "value": technical, "type": "technical", "stakeholderType": stakeholderData.stakeholderType, "yValue": 3})
            dataNew.push({"id": `${stakeholderData.id}-appropriateDataUse`, "name": stakeholderData.name, "value": appropriateDataUse, "type": "appropriate data use", "stakeholderType": stakeholderData.stakeholderType, "yValue": 4})
            setData(dataNew);
        }
    }

    const AddStakeholder = () => {

        return(
            <div className="Add-Stakeholder-Button">
                <Fab color="primary" onClick={add} className="Yellow">
                    <AddIcon />
                </Fab>
            </div>
        )
    }

    return(
        <div>
            <div className="Container2 Margin-Bottom">
                <div className="Add-Stakeholder-Button">
                    <div id={stakeholderId} className="Small-Margin-Bottom"></div>
                    <h4 className="Small-Margin">add stakeholder to diagram</h4>
                </div>
                <AddStakeholder/>
            </div>

            <Sliders updateAppropriateDataUse={updateAppropriateDataUse} updateTechnical={updateTechnical} updateStakeholderValues={updateStakeholderValues} updateAccountability={updateAccountability}/>
        </div>
        )

}

const Legend = () => {
    return(
        <div>
            <h4 className="Small-Margin">legend</h4>
            <div className="Row">
                <div>
                    <h5 className="Small-Margin">Stakeholder type</h5>
                    <div id={legendStakeholderId}></div>
                </div>
                <div>
                    <h5 className="Small-Margin">Risk level</h5>
                    <div id={legendRiskId} className="Small-Margin-Bottom"></div>
                </div>
            </div>
        </div>
    )
}

const Viz = () => {
    return(
        <div className="Margin-Bottom">
            <h4 className="No-Margin-Bottom">visualize</h4>
            <div id={chartId} className="chart"></div>
            <h6 className="Small-Margin-Top"></h6>
        </div>
    )
}

function RiskNetwork({}) {

    return(
        <div>
            <div className="Container2">
                <Viz/>
                <Legend/>
            </div>
        </div>
    )
}

export default function Risk({config, modules, policy, setPolicy, stakeholderData, setStakeholderData}) {

    let navigate = useNavigate();
    let sid = 0;
    const [data, setData] = useState([]);
    console.log(data)

    const routeNext = () => {
        let path = `/Decision`; 
        navigate(path);
    }

    const routeBack = () => {
        let path = `/Policy`;
        navigate(path);
    }

    useEffect(() => {
        initStakeholder(stakeholderId, stakeholderData[sid]);
        initGraph(chartId);
        initStakeholderLegend(legendStakeholderId);
        initRiskLegend(legendRiskId);
    }, []);

    useEffect(() => {
        renderGraph(chartId, data);
    }, [stakeholderData, data])

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <LeftSideBar>
                    <Description title={config.title}>
                        <p>Use the sliders to adjust the risks for each stakeholder you identified on the stakeholder mapping page</p>
                    </Description>
                    <RoleShort moduleName="deliberation"/>
                    <Terminology margin="Margin-Large-Bottom" className="Yellow">
                        <Term term={terms['proxy-variable']}/>
                    </Terminology>
                    <BackButton routeBack={routeBack}/>
                </LeftSideBar>
                <Content sid={sid} stakeholderData={stakeholderData[sid]} data={data} setData={setData}/>
                <RightSideBar>
                    <Progress id={config.id} modules={modules} className="Yellow"/>
                    <PolicyScenario policy={policy} setPolicy={setPolicy}/>
                    <NextButton routeNext={routeNext} className="Yellow"/>
                </RightSideBar>
            </div>
            <Footer/>
        </div>
    )
}
