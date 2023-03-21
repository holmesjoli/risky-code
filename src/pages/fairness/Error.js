import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import { Slider } from '@material-ui/core';
import * as d3 from 'd3';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Progress from "../../components/Progress";
import { BackButton, NextButton, NextButtonOverlay } from '../../components/Button';
import { LeftSideBar, RightSideBar, Description, Terminology, Term } from "../../components/Sidebar";
import { RoleShort } from "../../components/Role";
import { terms } from '../../utils/global';
import Overlay from "../../components/Overlay";
import Timer from "../../components/Timer";
import { fillScale, symbolScale, transform } from "./COMPAS";
import { initRaceLegend, drawLegend } from "./Calibration";
import { visStyles } from "../../utils/global";

import data from "../../data/processed/error.json";

let chartIdFPR = "Error-Chart-FPR";
let chartIdFNR = "Error-Chart-FNR";
let textIdFPR = "Error-text-FPR";
let textIdFNR = "Error-text-FNR";
let raceLegendId = "Error-Race-Legend";
let predictedLegendId = "Error-Predicted-Legend";

let width = 550;
let height = 225;

const opacityScale = d3.scaleOrdinal()
    .domain(["FP", "FN", "TP", "TN"])
    .range([1, 1, .35, .35]);

// Title Create Grid
function grid(data) {

    const cols = 50;
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

function initGraph(data, predictiveProbability) {
    d3.select(`#${chartIdFPR}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.select(`#${chartIdFNR}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    renderGraph(data, predictiveProbability);
}

function confusion(i) {

    if (!i.predicted && i.recid) {
        return "FN";
    } else if(!i.predicted && !i.recid) {
        return "TN";
    } else if(i.predicted && i.recid) {
        return "TP";
    } else if(i.predicted && !i.recid) {
        return "FP";
    }
}

export function initPredictedLegend(legendId) {

    let height = 40;

    d3.select(`#${legendId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    drawPredictedLegend(legendId);
}

export function drawPredictedLegend(legendId) {

    const width = window.width;

    const data = [{x: 10, y:10, name: "Correct"},
                  {x: 10, y:30, name: "Incorrect"}];
    
    const h = 40;

    const style = "darkMode";
    const opacityScale = d3.scaleOrdinal()
        .domain(["Correct", "Incorrect"])
        .range([.35, 1]);

    let svg = d3.select(`#${legendId} svg`);

    let shape = svg.append("g")
        .selectAll("circle")
            .data(data, d => d.name)
            .enter()
            .append("g")
        .attr("transform", (d, i) => `translate(${(i * 70) + 50}, ${h / 3})`);

     shape.append("circle")
        .attr("r", 6)
        .attr("opacity", d => opacityScale(d.name))
        .attr("fill", visStyles[style]["textColor"]);

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

function renderGraph(data, predictiveProbability) {

    let svgFPR = d3.select(`#${chartIdFPR} svg`);
    let svgFNR = d3.select(`#${chartIdFNR} svg`);

    for (let i of data) {
        i.predicted = i.decile > predictiveProbability;
        i.recid = i.recidn === "Positive" ? true: false;
        i.confusion = confusion(i);
    }

    let dataFilteredFPR = data.filter(d => d.recid);
    dataFilteredFPR = grid(dataFilteredFPR);

    let dataFilteredFNR = data.filter(d => !d.recid);
    dataFilteredFNR = grid(dataFilteredFNR);

    // console.log(dataFilteredFNR)

    svgFPR
        .selectAll("path")
        .data(dataFilteredFPR, d => d.id)
        .join(
            enter  => enter
            .append("path")
                .attr("d", d3.symbol()
                    .type(((d) => symbolScale(d.race)))
                    .size(20))
                .attr("transform", transform)
                .attr("fill", d => fillScale(d.race))
                .attr("opacity", d => opacityScale(d.confusion))
                .attr("stroke-width", 1)
                .attr("class", d => d.confusion),
            update => update
                .attr("opacity", d => opacityScale(d.confusion))
                .attr("class", d => d.confusion),
            exit => exit
                .attr("opacity", d => opacityScale(d.confusion))
                .attr("class", d => d.confusion)
                .remove()
    );

    svgFNR
        .selectAll("path")
        .data(dataFilteredFNR, d => d.id)
        .join(
            enter  => enter
            .append("path")
                .attr("d", d3.symbol()
                    .type(((d) => symbolScale(d.race)))
                    .size(20))
                .attr("transform", transform)
                .attr("fill", d => fillScale(d.race))
                .attr("opacity", d => opacityScale(d.confusion))
                .attr("stroke-width", 1)
                .attr("class", d => d.confusion),
            update => update
                .attr("opacity", d => opacityScale(d.confusion))
                .attr("class", d => d.confusion),
            exit => exit
                .attr("opacity", d => opacityScale(d.confusion))
                .attr("class", d => d.confusion)
                .remove()
        );

    // let FPR = dataFilteredFPR.filter(d => d.confusion === "FP" || d.confusion === "FN").length;
    // let FNR = dataFilteredFNR.filter(d => d.confusion === "FP" || d.confusion === "FN").length;
    // let FPRPct = Math.round((FPR/500)*100);
    // let FNRPct = Math.round((FNR/500)*100);

    // document.getElementById(textIdFPR).textContent="";

    // d3.select(`#${textIdFPR}`)
    //     .append("p")
    //     .text(`At a threshold of ${predictiveProbability}, ${FPR} out of 500 people Black people (${FPRPct}%) were predicted to reoffend, but did not reoffend` );

    // document.getElementById(textIdFNR).textContent="";

    // d3.select(`#${textIdFNR}`)
    //     .append("p")
    //     .text(`At a threshold of ${predictiveProbability}, ${FNR} out of 500 people white people (${FNRPct}%) were not predicted to reoffend, but did reoffend` )
}

export function Content() {

    const [predictiveProbability, setPredictiveProbability] = useState(4);

    const updateSlider = (event, value) => {
        setPredictiveProbability(value/10)
    }

    useEffect(() => {
        initGraph(data, predictiveProbability);
    }, []);

    useEffect(() => {
        renderGraph(data, predictiveProbability);
    }, [predictiveProbability]);

    return(
        <div className="Content No-Padding-Top">
            <div className="One-Column-Three2">
                <div>
                    <div className="Container Margin-Bottom">
                        <h4 className="Small-Margin-Bottom">predicted probability of reoffense</h4>
                        <p>Use the slider to adjust at what threshold defendants should be considered high-risk of reoffense.</p>
                        <Slider
                            size="small"
                            defaultValue={40}
                            min={10}
                            max={100}
                            step={10}
                            aria-label="Small"
                            valueLabelDisplay="auto"
                            onChange={updateSlider}
                            />
                    </div>
                    <div className="Container">
                        <div className="Legend">
                            <h4 className="Small-Margin">legend</h4>
                            <h5 className="Small-Margin">Race</h5>
                            <div id={raceLegendId} className="Small-Margin-Bottom"></div>
                            <h5 className="Small-Margin">Predicted</h5>
                            <div id={predictedLegendId}></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="Container">
                        <h3>the compas algorithm's recidivism predictions</h3>
                        <div>
                            <h4 className="Small-Margin">false positive rate</h4>
                            <div className="One-Column-Three3">
                                <div id={chartIdFPR}></div>
                                <div>
                                    <div id={textIdFPR} className="Container2"></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="Small-Margin Margin-Top">false negative rate</h4>
                            <div className="One-Column-Three3">
                                <div id={chartIdFNR}></div>
                                <div>
                                    <div id={textIdFNR} className="Container2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Error({config, modules, user, disableFairnessNext2, setDisableFairnessNext2}) {

    let navigate = useNavigate();
    // const [isOpen, setIsOpen] = useState(false);

    const routeNext = () => {
        let path = `/FairnessReflection`;
        navigate(path);
      }

    const routeBack = () => {
        let path = `/Calibration`; 
        navigate(path);
    }

    useEffect(() => {
        initRaceLegend(raceLegendId);
        initPredictedLegend(predictedLegendId);
    }, []);


    // const toggleOverlay = () => {
    //     setIsOpen(!isOpen);
    // };

    return (
        <div className="App">
            {/* {isOpen ?
            <Overlay isOpen={isOpen} onClose={toggleOverlay}>
            <div className="Containers-Container">
                <div className="Container-Fill-Secondary">
                    <div className="Two-Column-Three">
                        <div>
                            <h3 className="Page-Title">reflect</h3>
                        </div>
                        <RightSideBar>
                            <Timer user={user} disableNext={disableFairnessNext2} setDisableNext={setDisableFairnessNext2}>
                                <p>Do you agree with ProPublica that the COMPAS recidivism algorithm is biased?</p>
                                <p>Can you think of any problems with using a proxy variable in this type of algorithmic decision-making?</p>
                                <p>When may it be optimal to minimize the false positive error rate?</p>
                                <p className="No-Margin-Bottom">When may it be optimal to minimize the false negative error rate?</p>
                            </Timer>
                            {toggleOverlay? <NextButtonOverlay disabled={disableFairnessNext2} toggleOverlay={routeNext}/>: <></>}
                        </RightSideBar>
                    </div>
                </div>
            </div>
        </Overlay>:
        <></>
        } */}
            <Header/>
            <div className="Main">
                <LeftSideBar>
                    <Description config={config}>
                        <p> The decision to keep an individual in jail awaiting trial can have vast implications in an individuals life; it can strain social and employment relationships.</p>
                    </Description>
                    <RoleShort moduleName="fairness"/>
                    <Terminology margin="Margin-Large-Bottom">
                        <Term term={terms['recidivism']}/>
                        <Term term={terms['stakeholders']}/>
                        <Term term={terms['fpr']}/>
                        <Term term={terms['fnr']}/>
                    </Terminology>
                    <BackButton routeBack={routeBack}/>
                </LeftSideBar>
                <Content />
                <RightSideBar>
                    <Progress id={config.id} modules={modules}/>
                    <NextButton routeNext={routeNext}/>
                </RightSideBar>
            </div>
            <Footer/>
        </div>
    )
}
