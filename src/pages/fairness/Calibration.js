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
import { LeftSideBar, RightSideBar, Description, Terminology, Term } from "../../components/Sidebar";
import { transitionHighlight } from '../../components/PolicyDiagram';
import Timer from "../../components/Timer";

let chartId="Fairness-Chart"

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
        .text("Mathematical fairness definitions")
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

function Information() {
    return (
        <div className="Information">
        </div>
    )
}

export function Content() {
    return(
        <div className="Content Three-Column No-Padding-Top">
            <Information/>
        </div>
    )
}

export default function Calibration({config, user, disableFairnessNext, setDisableFairnessNext, modules}) {

    const [isOpen, setIsOpen] = useState(true);
    const [id, setId] = useState("fairness");

    let navigate = useNavigate(); 
    const routeNext = () => {
      let path = `/Error`; 
      navigate(path);
    }

    const routeBack = () => {
      let path = `/Train`; 
      navigate(path);
    }

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setId(isOpen ? "fairness": "calibration");
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
                    <div className="Two-Column-Three">
                        <div>
                            <h3 className="Page-Title Center">introduction to mathematical fairness</h3>
                            <div className="chart" id={chartId}></div>
                            <h6 className="Small-Margin-Top">Visualization shows twenty definitions of mathematical fairness. Visualization created using data collected by <NavLink to="/Resources">Verma and Rubin (2018).</NavLink> Purple nodes indicate which definitions of mathematical fairness are reviewed in the next module.</h6>
                        </div>
                        <RightSideBar>
                            <div className="Card-Group">
                                <h4>mathematical fairness' many definitions</h4>
                                <p className="No-Margin-Bottom">AI researchers have proposed over twenty mathematical constructions of fairness <NavLink to="/Resources">(Verma and Rubin 2018; Narayanan 2018)</NavLink>. Specifically, this module will review the <span className="Emphasis">calibration rate</span>, <span className="Emphasis">false positive rate</span>, and <span className="Emphasis">false negative rate</span>. In this module, we will learn how to calibrate a model to optimize for these different definitions.</p>
                            </div>
                            <Timer user={user} disableNext={disableFairnessNext} setDisableNext={setDisableFairnessNext}>
                                <p>Have you heard of any of these definitions before?</p>
                                <p>Have you used or come across any of these definitions in your work before?</p>
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
                    <p>COMPAS was designed to help judges decide whether to set bail and release an individual prior to trial and sentencing (Hao and Stray 2019). The decision to keep an individual in jail awaiting trial can have vast implications for their life; it can strain social and employment relationships. As of 2020, COMPAS was in use in four states at multiple points in the criminal justice system <NavLink to="/Resources">(Dipshan and Hudgins, 2020)</NavLink></p>
                </Description>
                <Terminology margin="Margin-Large-Bottom">
                    <Term term={terms['mathematical-fairness']}/>
                    <Term term={terms['calibration']}/>
                </Terminology>
                <BackButton routeBack={routeBack}/>
            </LeftSideBar>
            <Content/>
            <RightSideBar>
                <Progress id={id} modules={modules}/>
                <NextButton routeNext={routeNext}/>
            </RightSideBar>
        </div>
        <Footer/>
    </div>
    )
}
