import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Terminology from '../../components/Terminology';
import Progress from "../../components/Progress";
import { BackButton, NextButton } from '../../components/Button';
import { LeftSideBar, RightSideBar } from "../../components/Sidebar";
import { Consequence, Stakeholders } from "../../components/PolicyScenario";
import { Slider, MenuItem, FormControl, Select } from '@material-ui/core' ;
import * as d3 from 'd3';
import data from "../../data/processed/error.json";
import { visStyles } from "../../utils/global";
import { Points } from "../../components/Legend";

let chartIdBlack = "COMPAS-Chart-Black";
let chartIdWhite = "COMPAS-Chart-White";
let textIdBlack = "COMPAS-text-Black";
let textIdWhite = "COMPAS-text-White";
let width = 570;
let height = 250;
let style = "darkMode";
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
    } else {
        return "FP";
    }
}

function renderGraph(data, definition, predictiveProbability) {

    let svgBlack = d3.select(`#${chartIdBlack} svg`);
    let svgWhite = d3.select(`#${chartIdWhite} svg`);

    for (let i of data) {
        i.predicted = i.decile > predictiveProbability;
        i.recid = i.redidn === "Positive" ? true: false;
        i.confusion = confusion(i);
    }

    console.log(data)

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
                .attr("fill", d => fillScale(d.confusion)),
            update => update
                .attr("fill", d => fillScale(d.confusion)),
            exit   => exit.remove()
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
                .attr("fill", d => fillScale(d.confusion)),
            update => update
                .attr("fill", d => fillScale(d.confusion)),
            exit   => exit.remove()
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

    // console.log(dataFilteredBlack)
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
        <div className="Content">
            <div className="One-Column-Three2">
                <div>
                    <div className="Container Margin-Bottom">
                        <h3>mathematical fairness definition</h3>
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
                            <h4>black</h4>
                            <div className="One-Column-Three3">
                                <div id={chartIdBlack} className="Card-Group"></div>
                                <div id={textIdBlack} className="Card-Group"></div>
                            </div>
                        </div>
                        <div>
                            <h4>white</h4>
                            <div className="One-Column-Three3">
                                <div id={chartIdWhite} className="Card-Group"></div>
                                <div id={textIdWhite} className="Card-Group"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function COMPAS({config, modules}) {

    let navigate = useNavigate();

    const routeNext = () => {
        let path = `/Stakeholders`; 
        navigate(path);
      }

    const routeBack = () => {
        let path = `/StreetBump`; 
        navigate(path);
    }

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <LeftSideBar>
                    <Description config={config}/>
                    <Terminology>
                        <div className="Container-Rule">
                                <h4>recidivism</h4>
                                <p>A criminal reoffense</p>
                        </div>
                        <div className="Container-Rule">
                            <h4>stakeholders</h4>
                            <p>People impacted directly or indirectly by a system <NavLink to="/Resources">(Bender and Friedman 2018)</NavLink></p>
                        </div>
                    </Terminology>
                    <BackButton routeBack={routeBack}/>
                </LeftSideBar>
                <Content />
                <RightSideBar>
                <Progress id={config.id} modules={modules}/>
                    <Stakeholders/>
                    <Consequence/>
                    <NextButton routeNext={routeNext}/>
                </RightSideBar>
            </div>
            <Footer/>
        </div>
    )
}
