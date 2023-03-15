import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import * as d3 from 'd3';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Overlay from "../../components/Overlay";
import data from "../../data/processed/mathematical_fairness.json"
import { wrap, visStyles } from "../../utils/global";
import { terms } from '../../utils/global';
import Progress from "../../components/Progress";
import { BackButton, NextButton, NextButtonOverlay } from '../../components/Button';
import { LeftSideBar, RightSideBar, Description, Terminology, Term, Role, RoleAccordion } from "../../components/Sidebar";
import { transitionHighlight } from '../../components/PolicyDiagram';
import Timer from "../../components/Timer";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import { BaseRates } from "../../components/TrackUserInputs";

let chartId = "Fairness-Chart";

function textAngle(angle) {
    return (180/Math.PI)*angle; 
}

function flipText(angle) {
    
    if (angle < 4.7 && angle > 1.6) {
        return `-1, -1`;
    } else {
        return `1, 1`;
    }
}

function textAnchor(angle) {
    
    if (angle < 4.7 && angle > 1.6) {
        return "end";
    } else {
        return "start";
    }
}

// Tooltip
function renderTooltip(style="darkMode") {

    let tooltip = d3.select(`${chartId}`)
        .append("div")
        .attr("class", "tooltip");

    d3.selectAll(`${chartId} circle`).on("mouseover", function(e, d) {

        let thisCircle = d3.select(this);
        let x = e.layerX + 20;
        let y = e.layerY - 10;

        tooltip.style("visibility", "visible")
            .style("top", `${y}px`)
            .style("left", `${x}px`)
            .html(`${d.fairness_definition} <br> ${d.author}`);

        thisCircle
            .attr("stroke", visStyles[style]["highlightColor"])
            .attr("stroke-width", 1.5);

    }).on("mouseout", function() {

        tooltip.style("visibility", "hidden");

        d3.selectAll(`${chartId} circle`)
            .attr("stroke", visStyles[style]["borderColor"])
            .attr("stroke-width", 1);
    });
}

function fairnessDefinitions(style = "darkMode") {

    let n = data.length;
    let theta = ((Math.PI*2) / n);
    let width = 650;
    let height = 510;
    let radius = 120;

    for (let i in data) {
        data[i].angle = (theta * i);
        data[i].x = (radius * Math.cos(data[i].angle)) + width/2;
        data[i].y = (radius * Math.sin(data[i].angle)) + height/2;
        data[i].xLabel = (radius*1.17 * Math.cos(data[i].angle)) + width/2;
        data[i].yLabel = (radius*1.17 * Math.sin(data[i].angle)) + height/2;
    }

    let svg = d3.select(`#${chartId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    
    svg.append("text")
        .attr("x", width/2)
        .attr("y", height/2)
        .text("Algorithmic fairness definitions")
        .attr("fill", "#cbcbcb")
        .attr("font-size", 14)
        .attr("text-anchor", "middle")
        .call(wrap, 100);

    svg = svg.selectAll("circle")
        .data(data)
        .enter();

    svg
        .append("a")
        .attr("href", d => d.link)
        .attr("target", "_blank")
        .append("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 8)
        .attr("fill", visStyles[style]["fillColor"])
        .attr("stroke", visStyles[style]["borderColor"])
        .attr("stroke-width", visStyles[style]["borderWidth"])
        .attr("class", d => d.highlight? "shadow highlight": "shadow");

    svg.append("text")
        .attr("transform", d => `translate(${d.xLabel},${d.yLabel}) rotate(${textAngle(d.angle)}) scale(${flipText(d.angle)})`)
        .attr("text-anchor", d => textAnchor(d.angle))
        .attr("alignment-baseline", "bottom")
        .attr("fill", visStyles[style]["textHighlightColor"])
        .attr("font-size", 12)
        .attr("letter-spacing", visStyles[style]["letterSpacing"])
        .text(d => d.fairness_definition);

    renderTooltip();
    transitionHighlight(style);
}

function Reflect({user, disableFairnessNext, setDisableFairnessNext, baseRatesBrainstorm, setBaseRatesBrainstorm}) {
    // select one
    return(
        <div>
            <BaseRates baseRatesBrainstorm={baseRatesBrainstorm} setBaseRatesBrainstorm={setBaseRatesBrainstorm}>
                <p>Brainstorm why the base rate between different races may differ in the space below</p>
            </BaseRates>
            <div className="Card-Group">
                <h3 className="Small-Margin">discuss</h3>
                <p>Have you heard of any of these definitions before?</p>
                <p className="No-Margin-Bottom">Have you used or come across any of these definitions in your work before?</p>
            </div>
            {/* {toggleOverlay? <NextButtonOverlay disabled={disableFairnessNext} toggleOverlay={toggleOverlay}/>: <></>} */}
        </div>
    )
}

function ImpossibilityTheorem() {
    // select one
    return(
        <div>
            <div className="chart" id={chartId}></div>
            <h6 className="Small-Margin-Top">Visualization shows twenty definitions of algorithmic fairness. Visualization created using data collected by <NavLink to="/Resources">Verma and Rubin (2018).</NavLink> Purple nodes indicate which definitions of algorithmic fairness are reviewed in this module.</h6>
        </div>
    )
}

function Model() {
    return(
        <div className="Card-Group Model">
            <h3 className="Small-Margin">explore</h3>
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
                <div className="Variable-Flat">arrests</div>
            </div>
        </div>
    </div>
    )
}

export function Content({baseRatesBrainstorm, setBaseRatesBrainstorm, user, disableFairnessNext, setDisableFairnessNext}) {
    return(
        <div className="Content No-Padding-Top">
            <div className="Container">
                <h3 className="No-Margin-Bottom">explore</h3>
                <div className="Two-Column-Three">
                    <ImpossibilityTheorem/>
                    <Reflect baseRatesBrainstorm={baseRatesBrainstorm} setBaseRatesBrainstorm={setBaseRatesBrainstorm} user={user} disableFairnessNext={disableFairnessNext} setDisableFairnessNext={setDisableFairnessNext}/>
                </div>
            </div>
        </div>
    )
}

export default function COMPAS({config, user, disableFairnessNext, setDisableFairnessNext, baseRatesBrainstorm, setBaseRatesBrainstorm, modules}) {

    const [isOpen, setIsOpen] = useState(true);
    const [id, setId] = useState("fairness");

    let navigate = useNavigate(); 
    const routeNext = () => {
      let path = `/Calibration`; 
      navigate(path);
    }

    const routeBack = () => {
      let path = `/Optimize`; 
      navigate(path);
    }

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setId(isOpen ? "fairness": "compas");
    }, [isOpen])

    useEffect(() => {
        fairnessDefinitions();
    }, [])

    return (
        <div className="App">{
            isOpen ?
            <Overlay isOpen={isOpen} onClose={toggleOverlay}>
            <div className="Containers-Container">
                <div className="Container-Fill-Secondary No-Padding-Right">
                <h3 className="Page-Title">introduction to algorithmic fairness</h3>
                    <div className="Two-Column-Three">
                        <div className="Two-Column">
                            <div>
                                <div className="Card-Group">
                                    <h3 className="Small-Margin">learn</h3>
                                    <p>In this module, <span className="Emphasis">Algorithmic Fairness</span>, we will look as the COMPAS recidivism algorithm. Algorithmic decision-making systems like COMPAS are trying to predict whether a defendant will commit another crime if released.</p>
                                    {/* <p className="No-Margin-Bottom">Algorithmically informed decision-making is often also called algorithmic or automated decision-making. The term algorithmic decision-making has been modified in this research to include the word <span className="Emphasis">informed</span> in recognition of the reality that most automated systems are only semi-automatic and have some level of human interaction and oversight.</p> */}
                                    <p>However, the dataset used to train COMPAS only reports whether a defendant was charged with another crime (arrests). In statistical modeling, arrests is called a proxy variable.</p>
                                    <p className="No-Margin-Bottom">Research showed that the COMPAS recidivism algorithm used a <a href="https://www.documentcloud.org/documents/2702103-Sample-Risk-Assessment-COMPAS-CORE.html#document/p4/a296597" target="_blank">137 variables</a> in their statistical model. Example variables are shown below. Hover over the variables for a longer variable definition.</p>
                                </div>
                                <div className="Card-Group">
                                    <h3 className="Small-Margin">define</h3>
                                    <p className="No-Margin-Bottom">The term <span className="Semi-Bold">algorithmic decision-making system</span> is defined as <span className="Emphasis">a system that uses automated reasoning to aid or replace a decision-making process that would otherwise be performed by humans <NavLink to="/Resources">(AINOW 2018)</NavLink></span>.</p>
                                </div>
                           </div>
                            <Model/>
                        </div>
                        <RightSideBar>
                            <Role moduleName="fairness"/>
                            <Timer user={user} disableNext={disableFairnessNext} setDisableNext={setDisableFairnessNext}>
                                <p>Does everyone who commits a crime get charged with that crime? What are some factors that affect the likelihood that someone who commits a crime will be arrested and charged?</p>
                                <p className="No-Margin-Bottom">Do you think that <span className="Emphasis">arrests</span> is a good proxy variable for <span className="Emphasis">reoffense</span>?</p>
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
                    <p>AI researchers have proposed over twenty mathematical constructions of fairness <NavLink to="/Resources">(Verma and Rubin 2018; Narayanan 2018)</NavLink>. However, <NavLink to="/Resources">Kleinberg et al.'s (2016) </NavLink>research demonstrates that it is <span className="Semi-Bold">impossible</span> to meet multiple definitions of algorithmic fairness if there are discrepancies in the underlying base rates (prevalence) in a population.</p>
                    <p>In this dataset, the prevalence of <span className="Emphasis">new charges</span> is higher for Black defendants compared to White defendants. However, this should not be interpreted to mean that the prevalence of <span className="Emphasis">new crimes</span> is higher for Black defendants compared to White defendants.</p>
                </Description>
                <RoleAccordion moduleName="fairness"/>
                <Terminology margin="Margin-Large-Bottom">
                    <Term term={terms['mathematical-fairness']}/>
                    <Term term={terms['population-base-rate']}/>
                    <Term term={terms['proxy-variable']}/>
                    <Term term={terms['recidivism']}/>
                </Terminology>
                <BackButton routeBack={routeBack}/>
            </LeftSideBar>
            <Content baseRatesBrainstorm={baseRatesBrainstorm} setBaseRatesBrainstorm={setBaseRatesBrainstorm} user={user} disableFairnessNext={disableFairnessNext} setDisableFairnessNext={ setDisableFairnessNext}/>
            <RightSideBar>
                <Progress id={id} modules={modules}/>
                <NextButton routeNext={routeNext}/>
            </RightSideBar>
        </div>
        <Footer/>
    </div>
    )
}
