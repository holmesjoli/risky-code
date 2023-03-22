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
import { riskData } from "../../utils/global";
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

let chartId = "Risk-Chart";
let legendId = "Risk-Legend";

let width = 660;
let height = 460;
let style = "darkMode";
let margin = {left: 70, right: 30, top: 30, bottom: 70};

function initGraph(data) {
    d3.select(`#${chartId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.select(`#${chartId}`)
        .append("div")
        .attr("class", "tooltip");

    renderGraph(data);
}

function renderGraph(data) {

    let svg = d3.select(`#${chartId} svg`);
    console.log(data)
}

function RiskLevel({title, defaultValue, handleChange, children}) {

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
        <div className="Container2 Margin-Bottom">
            <h3 className="Small-Margin">{title}</h3>
            {children}
            <div className="Padding-Left Padding-Right">
                  <Slider
                  size="small"
                  defaultValue={defaultValue}
                  min={1}
                  max={5}
                  step={3}
                  aria-label="Small"
                  marks={marks}
                  valueLabelDisplay="auto"
                  onChange={handleChange}
              />
            </div>
        </div>
    );
}

export function Content() {

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

    return(
        <div className="Content One-Column-Three No-Padding-Top">
            <div className="Container Margin-Bottom">
                <RiskLevel title="risk of appropriate data use" defaultValue={appropriateDataUse} handleChange={updateAppropriateDataUse}>
                    <ul>
                        <Tooltip title="Consider if citizen data is used and if citizens opted into data collection">
                            <li className="Small-Margin">Risk of <span className="Emphasis">citizen data use</span></li>
                        </Tooltip>
                        <Tooltip title="Consider the purposes and context under which the data was obtained">
                            <li className="Small-Margin">Risk of <span className="Emphasis">data compatability</span></li>
                        </Tooltip>
                    </ul>
                </RiskLevel>
                <RiskLevel title="risk of accountability" defaultValue={accountability} handleChange={updateAccountability}>
                    <ul>
                        <Tooltip title="Consider if the algorithm can be explained to lay users or only expert users">
                            <li className="Small-Margin">Risk of <span className="Emphasis">lack of algorithmic explainability</span></li>
                        </Tooltip>
                        <Tooltip title="Consider data and algorithm access">
                            <li className="Small-Margin">Risk of <span className="Emphasis">lack of algorithmic auditability</span></li>
                        </Tooltip>
                        <Tooltip title="Consider the degree (low, medium, high) of automation in decision-making.">
                            <li className="Small-Margin">Risk of <span className="Emphasis">automation</span></li>
                        </Tooltip>
                    </ul>
                </RiskLevel>
                <RiskLevel title="risk of technical bias" defaultValue={technical} handleChange={updateTechnical}>
                    <ul>
                        <Tooltip title="Consider representativeness of data, sample bias, data quality.">
                            <li className="Small-Margin">Risk of <span className="Emphasis">technical bias</span></li>
                        </Tooltip>
                        <Tooltip title="Consider if there is a match between the real world and the captured data.">
                            <li className="Small-Margin">Risk of <span className="Emphasis">proxy variables</span></li>
                        </Tooltip>
                    </ul>
                </RiskLevel>
                <RiskLevel title="risk of stakeholder values" defaultValue={stakeholderValues} handleChange={updateStakeholderValues}>
                    <ul>
                        <Tooltip title="Consider stakeholder values such as loss of life, liberty, or property">
                            <li className="Small-Margin">Risk of <span className="Emphasis">serious stakeholder harm</span></li>
                        </Tooltip>
                        <Tooltip title="Consider bias from racism, discrimination, class, gender, etc.">
                            <li className="Small-Margin">Risk of <span className="Emphasis">historic societal bias</span></li>
                        </Tooltip>
                    </ul>
                </RiskLevel>
            </div>
            <div className="Container Margin-Bottom">
                {/* <h4 className="No-Margin-Bottom">visualize</h4> */}
                <div id={chartId} className="chart"></div>
                {/* <h4>legend</h4> */}
                <div id={legendId} className="Small-Margin-Bottom"></div>
                <h6 className="Small-Margin-Top"></h6>
            </div>
        </div>
    )
}

export default function Risk({config, modules, policy, setPolicy, data}) {

    let navigate = useNavigate();

    const routeNext = () => {
        let path = `/Decision`; 
        navigate(path);
    }

    const routeBack = () => {
        let path = `/Policy`;
        navigate(path);
    }

    useEffect(() => {
        initGraph(data);
    }, []);

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <LeftSideBar>
                    <Description config={config}>
                    </Description>
                    <RoleShort moduleName="deliberation"/>
                    <Terminology margin="Margin-Large-Bottom">
                        <Term term={terms['proxy-variable']}/>
                    </Terminology>
                    <BackButton routeBack={routeBack}/>
                </LeftSideBar>
                <Content />
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
