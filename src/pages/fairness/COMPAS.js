import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import * as d3 from 'd3';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Overlay from "../../components/Overlay";
import { terms } from '../../utils/global';
import Progress from "../../components/Progress";
import { BackButton, NextButton, NextButtonOverlay } from '../../components/Button';
import { LeftSideBar, RightSideBar, Description, Terminology, Term } from "../../components/Sidebar";
import { RoleShort } from "../../components/Role";
import Timer from "../../components/Timer";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import { BaseRates } from "../../components/Brainstorm";
import data from "../../data/processed/baseRates.json";

let chartId = "Base-Rates";
let width = 550;
let height = 500;
let margin = {left: 10, right: 10, top: 10, bottom: 10}

const xScale = d3.scaleLinear()
    .domain([0, width])
    .range([margin.left, width-margin.right]);

const yScale = d3.scaleLinear()
    .domain([0, height])
    .range([height-margin.bottom, margin.top]);

const fillScale = d3.scaleOrdinal()
    .domain(["White", "Black", "Other"])
    .range(["#F50141", "#FD7B03", "#F3C010"]);

function grid(data) {

    const cols = 70;
    const colW = width / cols;
    const rows = Math.round(data.length/cols)
    const rowH = height / rows;

    for (let i = 0; i < data.length; i++) {

        let col = i % cols;
        let row = Math.floor(i / cols);
        data[i].x = (colW * col)
        data[i].y = (rowH * row)

    }

    return data;
}
    
function initGraph(data) {
    d3.select(`#${chartId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    renderGraph(data);
}
    
function renderGraph(data) {

    let svg = d3.select(`#${chartId} svg`);

    data = grid(data);

    svg
        .selectAll("circle")
        .data(data, d => d.id)
        .join(
            enter  => enter
                .append("circle")
                .attr("cx", function(d) { return xScale(d.x); })
                .attr("cy", function(d) { return yScale(d.y); })
                .attr("r", 2)
                // .attr("class", d => d.pop)
                .attr("fill", d => fillScale(d.pop)),
            update => update
                // .attr("class", d => d.pop)
                .attr("fill", d => fillScale(d.pop)),
            exit   => exit
                .attr("fill", d => fillScale(d.pop))
                // .attr("class", d => d.pop)
                .remove()
        );
}


function Reflect({user, disableFairnessNext, setDisableFairnessNext, baseRatesBrainstorm, setBaseRatesBrainstorm}) {
    // select one
    return(
        <div>
            <BaseRates baseRatesBrainstorm={baseRatesBrainstorm} setBaseRatesBrainstorm={setBaseRatesBrainstorm}>
                <p>Brainstorm why the base rate between different races (e.g., Black vs. White) may differ in the space below.</p>
            </BaseRates>
            {/* {toggleOverlay? <NextButtonOverlay disabled={disableFairnessNext} toggleOverlay={toggleOverlay}/>: <></>} */}
        </div>
    )
}

function Model() {
    return(
        <div className="Container2 Model">
            <p >Research showed that the COMPAS recidivism algorithm used a <a href="https://www.documentcloud.org/documents/2702103-Sample-Risk-Assessment-COMPAS-CORE.html#document/p4/a296597" target="_blank">137 variables</a> in their statistical model. Example variables are shown below. Hover over the variables for a longer variable definition.</p>
            <div className="Text-Align-Center">
                <div className="Bottom-Rule Margin-Bottom">
                    <h4 className="Text-Align-Left">model variables</h4>
                    <Tooltip title="Frequency of moving homes in the last twelve months">
                        <div className="Variable-Flat">moved frequently</div>
                    </Tooltip>
                    <Tooltip title="Suspected or admitted gang membership or affiliation with gang members">
                        <div className="Variable-Flat">gang membership</div>
                    </Tooltip>
                    <Tooltip title="Farents separateed">
                        <div className="Variable-Flat">parents separated</div>
                    </Tooltip>
                    <Tooltip title="Father, mother, sister, brother, or friend ever arrested and was your father or mother ever arrested">
                        <div className="Variable-Flat">family and friend incarceration</div>
                    </Tooltip>
                    <Tooltip title="Parent or parential figure drug or alcohol problem">
                        <div className="Variable-Flat">family member substance abuse</div>
                    </Tooltip>
                    <Tooltip title="Completion of a high school education or GED">
                        <div className="Variable-Flat">high school education/ged</div>
                    </Tooltip>
                    <Tooltip title="Employment">
                        <div className="Variable-Flat">current employment</div>
                    </Tooltip>
                    <Tooltip title="Age of first arrest">
                        <div className="Variable-Flat">age of first arrest</div>
                    </Tooltip>
                </div>
            <ExpandMoreIcon className="Scale200"/>
            <div className="Margin-Bottom">
                <h4 className="Text-Align-Left">outcome variable</h4>
                <Tooltip title="Age of first arrest">
                    <div className="Variable-Flat">arrested and charged</div>
                </Tooltip>
            </div>
        </div>
    </div>
    )
}

export function Content({baseRatesBrainstorm, setBaseRatesBrainstorm, user, disableFairnessNext, setDisableFairnessNext}) {
    return(
        <div className="Content No-Padding-Top">
            <div className="Container">
                <h3>explore</h3>
                <div className="Two-Column-Three">
                    <div id={chartId}></div>
                    <Reflect baseRatesBrainstorm={baseRatesBrainstorm} setBaseRatesBrainstorm={setBaseRatesBrainstorm} user={user} disableFairnessNext={disableFairnessNext} setDisableFairnessNext={setDisableFairnessNext}/>
                </div>
            </div>
        </div>
    )
}

export function Outcomes({}) {
    return(

        <div className="Container2 Model">
            <div className="Text-Align-Center">
                <div className="Bottom-Rule Margin-Bottom">
                    <h4 className="Text-Align-Left">model variable</h4>
                    <Tooltip title="Frequency of moving homes in the last twelve months">
                        <div className="Variable-Flat">moved frequently</div>
                    </Tooltip>
                </div>
                <div className="Margin-Bottom">
                    <h4 className="Text-Align-Left">proxy variable</h4>
                    <Tooltip title="Frequency of moving homes in the last twelve months">
                        <div className="Variable-Flat">arrests</div>
                    </Tooltip>
                </div>
        </div>
    </div>
    )
}

export default function COMPAS({config, user, disableFairnessNext, setDisableFairnessNext, baseRatesBrainstorm, setBaseRatesBrainstorm, modules}) {


    const [isOpen, setIsOpen] = useState(true);
    let navigate = useNavigate();
    const routeNext = () => {
      let path = `/Calibration`; 
      navigate(path);
    }

    const routeBack = () => {
      let path = `/Fairness`; 
      navigate(path);
    }

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        initGraph(data);
    }, []);

    // useEffect(() => {
    //     renderGraph(data);
    // }, []);

    return (
        <div className="App">{
            isOpen ?
            <Overlay isOpen={isOpen} onClose={toggleOverlay}>
            <div className="Containers-Container">
                <div className="Container-Fill-Secondary No-Padding-Right">
                <h3 className="Page-Title">introduction to compas' data</h3>
                    <div className="Two-Column-Three">
                        <Model/>
                        <RightSideBar>
                            <div className="Container2 Margin-Bottom">
                                <h4 className="Small-Margin">learn</h4>
                                <p>Before we jump into algorithmic fairness its important to know a little bit more about the COMPAS algorithm and its data.</p>
                                <p className="No-Margin-Bottom">The outcome variable of interest is the <span className="Emphasis">reoffense</span> in the COMPAS model. However, the dataset used to train COMPAS only reports whether a defendant was charged with another crime, <span className="Emphasis">arrests</span>. In predictive modeling, <span className="Emphasis">arrests</span>. is called a proxy variable for the actual outcome variable of interest, <span className="Emphasis">reoffense</span>.</p>
                            </div>
                            <Timer user={user} disableNext={disableFairnessNext} setDisableNext={setDisableFairnessNext}>
                                <p>Does everyone who commits a crime get charged with that crime?</p>
                                <p>What are some factors that affect the likelihood that someone who commits a crime will be arrested and charged?</p>
                                <p>Do you think that <span className="Emphasis">arrests</span> is a good proxy variable for <span className="Emphasis">reoffense</span>?</p>
                            </Timer>
                            {toggleOverlay? <NextButtonOverlay disabled={disableFairnessNext} toggleOverlay={toggleOverlay}/>: <></>}
                        </RightSideBar>
                    </div>
                </div>
            </div>
        </Overlay>:
        <></>
        }
        <Header/>
        <div className="Main">
            <LeftSideBar>
                <Description config={config}>
                    <p>In the dataset used to train COMPAS, the prevalence of <span className="Emphasis">new charges</span> is higher for Black defendants compared to White defendants. However, this should <span className="Semi-Bold">not</span> be interpreted to mean that the prevalence of <span className="Emphasis">new crimes</span> is higher for Black defendants compared to White defendants.</p>
                    <p>Prevalence of a certain demographic (e.g., race) in an underlying population (e.g. new charges) is called a <span className="Emphasis">base rate</span>. In this example, there are discrepancies in the underlying base rates in the newly charged population.</p>
                </Description>
                <RoleShort moduleName="fairness"/>
                <Terminology margin="Margin-Large-Bottom">
                    <Term term={terms['population-base-rate']}/>
                    <Term term={terms['proxy-variable']}/>
                    <Term term={terms['recidivism']}/>
                </Terminology>
                <BackButton routeBack={routeBack}/>
            </LeftSideBar>
            <Content baseRatesBrainstorm={baseRatesBrainstorm} setBaseRatesBrainstorm={setBaseRatesBrainstorm} user={user} disableFairnessNext={disableFairnessNext} setDisableFairnessNext={ setDisableFairnessNext}/>
            <RightSideBar>
                <Progress id={config.id} modules={modules}/>
                <NextButton routeNext={routeNext}/>
            </RightSideBar>
        </div>
        <Footer/>
    </div>
    )
}
