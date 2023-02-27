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

function initGraph(data, definition) {
    d3.select(`#${chartIdBlack}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.select(`#${chartIdWhite}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    renderGraph(data, definition);
}

function renderGraph(data, definition) {

    let recidn = definition === "fpr"? "Negative": "Positive";

    let svgBlack = d3.select(`#${chartIdBlack} svg`);
    let svgWhite = d3.select(`#${chartIdWhite} svg`)
    let dataFilteredBlack = data.filter(d => d.race === "black" && d.recidn === recidn);
    dataFilteredBlack = grid(dataFilteredBlack);

    let dataFilteredWhite = data.filter(d => d.race === "white" && d.recidn === recidn);
    dataFilteredWhite = grid(dataFilteredWhite);

    let blackNode = svgBlack
        .selectAll("circle")
        .data(dataFilteredBlack, d => d.id)
        .join(
            enter  => enter
                .append("circle")
                .attr("cx", function(d) { return xScale(d.x); })
                .attr("cy", function(d) { return yScale(d.y); })
                .attr("r", 4)
                .attr("fill", d => fillScale(d.confusion)),
            update => update,             
            exit   => exit.remove()
        );

    let whiteNode = svgWhite
        .selectAll("circle")
        .data(dataFilteredWhite, d => d.id)
        .join(
            enter  => enter
                .append("circle")
                .attr("cx", function(d) { return xScale(d.x); })
                .attr("cy", function(d) { return yScale(d.y); })
                .attr("r", 4)
                .attr("fill", d => fillScale(d.confusion)),
            update => update,             
            exit   => exit.remove()
        );
}

export function Content() {

    const [predictiveProbability, setPredictiveProbability] = useState(40);
    const [definition, setDefinition] = useState("fpr");

    const updateSlider = (event, value) => {
        setPredictiveProbability(value/10)
    }

    const updateDefinition = (event) => {
        setDefinition(event.target.value)
    }

    useEffect(() => {
        initGraph(data, definition);
    }, []);

    useEffect(() => {
        renderGraph(data, definition);
    }, [predictiveProbability, definition]);

    return(
        <div className="Content">
            <div className="Three-Column3">
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
                                <MenuItem value="calibration">Calibration Rate</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="Container">
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
                </div>
                <div>
                    <div className="Container">
                        <h3>the compas algorithm's recidivism predictions</h3>
                        <div>
                            <h4>black</h4>
                            <div id={chartIdBlack} className="Margin-Bottom Bottom-Rule"></div>
                        </div>
                        <div>
                            <h4 className="Margin-Top">white</h4>
                            <div id={chartIdWhite}></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="Container">
                        <Points/>
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
