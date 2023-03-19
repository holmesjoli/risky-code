import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import { Slider, MenuItem, FormControl, Select } from '@material-ui/core';
import * as d3 from 'd3';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Progress from "../../components/Progress";
import { BackButton, NextButton, NextButtonOverlay } from '../../components/Button';
import { LeftSideBar, RightSideBar, Description, Terminology, Term } from "../../components/Sidebar";
import { RoleShort } from "../../components/Role";
import { terms } from '../../utils/global';
import { Points } from "../../components/Legend";
import Overlay from "../../components/Overlay";
import Timer from "../../components/Timer";

import data from "../../data/processed/error.json";

let chartIdBlack = "COMPAS-Chart-Black";
let chartIdWhite = "COMPAS-Chart-White";
let textIdBlack = "COMPAS-text-Black";
let textIdWhite = "COMPAS-text-White";
let width = 550;
let height = 225;
let margin = {left: 10, right: 10, top: 10, bottom: 10}

const xScale = d3.scaleLinear()
    .domain([0, width])
    .range([margin.left, width-margin.right]);

const yScale = d3.scaleLinear()
    .domain([0, height])
    .range([height-margin.bottom, margin.top]);

const fillScale = d3.scaleOrdinal()
    .domain(["FP", "FN", "TP", "TN"])
    .range(["#F50141", "#F50141", "#272B30", "#272B30"])

// Title Create Grid
function grid(data) {

    const cols = 25;
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

function initGraph(data, definition, predictiveProbability) {
    d3.select(`#${chartIdBlack}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.select(`#${chartIdWhite}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    renderGraph(data, definition, predictiveProbability);
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

function renderGraph(data, definition, predictiveProbability) {

    let svgBlack = d3.select(`#${chartIdBlack} svg`);
    let svgWhite = d3.select(`#${chartIdWhite} svg`);

    for (let i of data) {
        i.predicted = i.decile > predictiveProbability;
        i.recid = i.recidn === "Positive" ? true: false;
        i.confusion = confusion(i);
    }

    let recidn = definition === "fpr"? "Negative": "Positive";
    let text = definition === "fpr"? "were predicted to reoffend, but did not reoffend": "were not predicted to reoffend, but did reoffend"

    let dataFilteredBlack = data.filter(d => d.race === "black" && d.recidn === recidn);
    dataFilteredBlack = grid(dataFilteredBlack);

    let dataFilteredWhite = data.filter(d => d.race === "white" && d.recidn === recidn);
    dataFilteredWhite = grid(dataFilteredWhite);

    svgBlack
        .selectAll("circle")
        .data(dataFilteredBlack, d => d.id)
        .join(
            enter  => enter
                .append("circle")
                .attr("cx", function(d) { return xScale(d.x); })
                .attr("cy", function(d) { return yScale(d.y); })
                .attr("r", 4)
                .attr("fill", d => fillScale(d.confusion))
                .attr("class", d => d.confusion),
            update => update
                .attr("fill", d => fillScale(d.confusion))
                .attr("class", d => d.confusion),
            exit   => exit
                .attr("fill", d => fillScale(d.confusion))
                .attr("class", d => d.confusion)
                .remove()
        );

    svgWhite
        .selectAll("circle")
        .data(dataFilteredWhite, d => d.id)
        .join(
            enter  => enter
                .append("circle")
                .attr("cx", function(d) { return xScale(d.x); })
                .attr("cy", function(d) { return yScale(d.y); })
                .attr("r", 4)
                .attr("fill", d => fillScale(d.confusion))
                .attr("class", d => d.confusion),
            update => update
                .attr("fill", d => fillScale(d.confusion))
                .attr("class", d => d.confusion),
            exit   => exit
                .attr("fill", d => fillScale(d.confusion))
                .attr("class", d => d.confusion)
                .remove()
        );

    let incorrectWhite = dataFilteredWhite.filter(d => d.confusion === "FP" || d.confusion === "FN").length;
    let incorrectBlack = dataFilteredBlack.filter(d => d.confusion === "FP" || d.confusion === "FN").length;
    let incorrectBlackPct = Math.round((incorrectBlack/500)*100);
    let incorrectWhitePct = Math.round((incorrectWhite/500)*100);

    document.getElementById(textIdBlack).textContent="";

    d3.select(`#${textIdBlack}`)
        .append("p")
        .text(`At a threshold of ${predictiveProbability}, ${incorrectBlack} out of 500 people Black people (${incorrectBlackPct}%) ${text}` );


    document.getElementById(textIdWhite).textContent="";

    d3.select(`#${textIdWhite}`)
        .append("p")
        .text(`At a threshold of ${predictiveProbability}, ${incorrectWhite} out of 500 people white people (${incorrectWhitePct}%) ${text}` )
}

export function Content() {

    const [predictiveProbability, setPredictiveProbability] = useState(4);
    const [definition, setDefinition] = useState("fpr");

    const updateSlider = (event, value) => {
        setPredictiveProbability(value/10)
    }

    const updateDefinition = (event) => {
        setDefinition(event.target.value)
    }

    useEffect(() => {
        initGraph(data, definition, predictiveProbability);
    }, []);

    useEffect(() => {
        renderGraph(data, definition, predictiveProbability);
    }, [predictiveProbability, definition]);

    return(
        <div className="Content No-Padding-Top">
            <div className="One-Column-Three2">
                <div>
                    <div className="Container Margin-Bottom">
                        <h3>algorithmic fairness definition</h3>
                        <FormControl variant="outlined" size="small">
                            <Select
                                value={definition}
                                onChange={updateDefinition}
                            >
                                <MenuItem value="fpr">False Positive Rate</MenuItem>
                                <MenuItem value="fnr">False Negative Rate</MenuItem>
                                {/* <MenuItem value="calibration">Calibration Rate</MenuItem> */}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="Container Margin-Bottom">
                        <h3>predicted probability of reoffense</h3>
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
                    <Points/>
                </div>
                <div>
                    <div className="Container">
                        <h3>the compas algorithm's recidivism predictions</h3>
                        <div>
                            <h4 className="Small-Margin">black</h4>
                            <div className="One-Column-Three3">
                                <div id={chartIdBlack}></div>
                                <div>
                                    <div id={textIdBlack} className="Card-Group"></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="Small-Margin Margin-Top">white</h4>
                            <div className="One-Column-Three3">
                                <div id={chartIdWhite}></div>
                                <div>
                                    <div id={textIdWhite} className="Card-Group"></div>
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
    const [isOpen, setIsOpen] = useState(false);

    const routeNext = () => {
        let path = `/StreetBump`; 
        navigate(path);
      }

    const routeBack = () => {
        let path = `/Calibration`; 
        navigate(path);
    }

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="App">{isOpen ?
            <Overlay isOpen={isOpen} onClose={toggleOverlay}>
            <div className="Containers-Container">
                <div className="Container-Fill-Secondary">
                    <div className="Two-Column-Three">
                        <div>
                            <h3 className="Page-Title">reflect</h3>
                            <div className="Card-Group">
                                {/* <h3>laundry rules</h3> */}
                            </div>
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
        }
            <Header/>
            <div className="Main">
                <LeftSideBar>
                    <Description config={config}>
                        <p>COMPAS was designed to help judges decide whether to set bail and release an individual prior to trial and sentencing (Hao and Stray 2019). The decision to keep an individual in jail awaiting trial can have vast implications in an individuals life; it can strain social and employment relationships. As of 2020, COMPAS was in use in four states at multiple points in the criminal justice system <NavLink to="/Resources">(Dipshan and Hudgins, 2020)</NavLink></p>
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
                    <NextButton routeNext={toggleOverlay}/>
                </RightSideBar>
            </div>
            <Footer/>
        </div>
    )
}
