import React, { useEffect, useState } from 'react';
import { useNavigate} from "react-router-dom";
import { FormControl, RadioGroup, FormControlLabel, Radio, Slider } from '@material-ui/core';
import * as d3 from 'd3';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Progress from "../../components/Progress";
import { BackButton, NextButton } from '../../components/Button';
import { LeftSideBar, RightSideBar, Description, Terminology, Term, COMPASFair } from "../../components/Sidebar";
import { RoleShort } from "../../components/Role";
import { terms } from '../../utils/global';
import { fillScale, symbolScale, transform } from "./COMPAS";
import { initRaceLegend } from "./Calibration";
import { visStyles } from "../../utils/global";

import data from "../../data/processed/error.json";

let chartIdFPR = "Error-Chart-FPR";
let chartIdFNR = "Error-Chart-FNR";
let textIdFPR = "Error-text-FPR";
let textIdFNR = "Error-text-FNR";
let raceLegendId = "Error-Race-Legend";
let predictedLegendId = "Error-Predicted-Legend";
let style = "darkMode";

let width = 480;
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

    d3.select(`#${chartIdFPR}`)
        .append("div")
        .attr("class", "tooltip");

    d3.select(`#${chartIdFNR}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.select(`#${chartIdFNR}`)
        .append("div")
        .attr("class", "tooltip");

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

    // const width = window.width;

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
        .attr("transform", (d, i) => `translate(${(i * 70) + 30}, ${h / 3})`);

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

    let dataFilteredFPR = data.filter(d => !d.recid);
    dataFilteredFPR = grid(dataFilteredFPR);

    let dataFilteredFNR = data.filter(d => d.recid);
    dataFilteredFNR = grid(dataFilteredFNR);

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
                .attr("class", "compas-error-rate-point"),
            update => update
                .attr("opacity", d => opacityScale(d.confusion))
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
                .attr("class", "compas-error-rate-point"),
            update => update
                .attr("opacity", d => opacityScale(d.confusion))
        );

    let FPRWhite = dataFilteredFPR.filter(d => d.race === "White" && d.confusion === "FP").length;
    let FNRWhite = dataFilteredFNR.filter(d => d.race === "White" && d.confusion === "FN").length;

    let FPRBlack = dataFilteredFPR.filter(d => d.race === "Black" && d.confusion === "FP").length;
    let FNRBlack = dataFilteredFNR.filter(d => d.race === "Black" && d.confusion === "FN").length;

    let FPRPctWhite = Math.round((FPRWhite/500)*100);
    let FNRPctWhite = Math.round((FNRWhite/500)*100);

    let FPRPctBlack = Math.round((FPRBlack/500)*100);
    let FNRPctBlack = Math.round((FNRBlack/500)*100);

    document.getElementById(textIdFPR).textContent="";

    d3.select(`#${textIdFPR}`)
        .append("p")
        .attr("class", "No-Margin-Bottom")
        .text(`At a risk level of ${predictiveProbability}, COMPAS incorrectly predicts that ${FPRPctBlack}% of Black people and ${FPRPctWhite}% of White people will reoffend, who do not reoffend`);

    document.getElementById(textIdFNR).textContent="";

    d3.select(`#${textIdFNR}`)
        .append("p")
        .attr("class", "No-Margin-Bottom")
        .text(`At a risk level of ${predictiveProbability}, COMPAS incorrectly predicts that ${FNRPctBlack}% of Black people and ${FNRPctWhite}% of White people will not reoffend, who do reoffend`);

    renderTooltip(chartIdFPR);
    renderTooltip(chartIdFNR);
}

function renderTooltip(chartId) {
    var tooltip = d3.select(`#${chartId} .tooltip`);

    d3.selectAll(`#${chartId} .compas-error-rate-point`)
        .on("mouseover", function (e, d) {

        let thisCircle = d3.select(this);
        var x = d.x + 20;
        var y = d.y - 10;

        thisCircle
            .attr("stroke-width", 2)
            .attr("stroke", visStyles[style]["secondaryHighlightColor"]);

        tooltip.style("visibility", "visible")
            .style("left", x + "px")
            .style("top", y + "px")
            .html(`A ${d.race} person who was predicted ${d.confusion === "FP" || d.confusion === "FN"? "incorrectly": "correctly"} by the COMPAS algorithm`);

    }).on("mouseout", function () {
        tooltip.style("visibility", "hidden");

        d3.selectAll(`#${chartId} .compas-error-rate-point`)
            .attr("stroke", "none");
    });
}

export function Content({modules}) {

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
            <Progress id="error" modules={modules} className="Purple"/>
            <div className="One-Column-Three2">
                <div>
                    <div className="Container Margin-Bottom">
                        <h4 className="Small-Margin-Bottom">predicted probability of reoffense</h4>
                        <p>Choose the risk level you believe someone should be considered at a high-risk of reoffense.</p>
                        <Slider
                            size="small"
                            defaultValue={40}
                            min={10}
                            max={100}
                            step={10}
                            aria-label="Small"
                            valueLabelDisplay="auto"
                            className="Purple"
                            onChange={updateSlider}
                            />
                        <p className="No-Margin-Bottom">Keeping an individual in jail awaiting trial can have vast implications in an individuals life; it can strain social and employment relationships.</p>
                    </div>
                    <div className="Container Margin-Bottom">
                        <div className="Legend">
                            <h4 className="Small-Margin">legend</h4>
                            <h5 className="Small-Margin">Race</h5>
                            <div id={raceLegendId} className="Small-Margin-Bottom"></div>
                            <h5 className="Small-Margin">Predicted</h5>
                            <div id={predictedLegendId}></div>
                        </div>
                    </div>
                    <COMPASFair/>
                </div>
                <div>
                    <div className="Container">
                        <h3>the compas algorithm's recidivism predictions</h3>
                        <div>
                            <h4 className="Small-Margin">false positive rate</h4>
                            <div className="One-Column-Three3">
                                <div id={chartIdFPR} className="chart"></div>
                                <div>
                                    <div id={textIdFPR} className="Container2 Margin-Left"></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="Small-Margin Margin-Top">false negative rate</h4>
                            <div className="One-Column-Three3">
                                <div id={chartIdFNR} className="chart"></div>
                                <div>
                                    <div id={textIdFNR} className="Container2 Margin-Left"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Error({config, modules}) {

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
                            <Timer user={user} disableNext={disableFairnessNext2} setDisableNext={setDisableFairnessNext2} className="Purple">
                            </Timer>
                            {toggleOverlay? <NextButtonOverlay disabled={disableFairnessNext2} toggleOverlay={routeNext} className="Purple"/>: <></>}
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
                    <Description title={config.title}>
                        <p>Optimize the false positive rate and false negative rate by moving the slider. </p>
                    </Description>
                    <RoleShort moduleName="fairness"/>
                    <Terminology margin="Margin-Large-Bottom" className="Purple">
                        <Term term={terms['fpr']}/>
                        <Term term={terms['fnr']}/>
                        <Term term={terms['mathematical-fairness']}/>
                        <Term term={terms['recidivism']}/>
                    </Terminology>
                    <div className="Button-Container-Right">
                        <BackButton routeBack={routeBack}/>
                        <NextButton routeNext={routeNext} className="Purple"d/>
                    </div>
                </LeftSideBar>
                <Content modules={modules}/>
            </div>
            <Footer/>
        </div>
    )
}
