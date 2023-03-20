import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import * as d3 from 'd3';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Overlay from "../../components/Overlay";
import { wrap, visStyles } from "../../utils/global";
import { terms } from '../../utils/global';
import Progress from "../../components/Progress";
import { BackButton, NextButton, NextButtonOverlay } from '../../components/Button';
import { LeftSideBar, RightSideBar, Description, Terminology, Term } from "../../components/Sidebar";
import Timer from "../../components/Timer";
import { RoleShort } from "../../components/Role";
import fairnessData from "../../data/processed/mathematical_fairness.json"
import data from "../../data/processed/calibrationCurve.json";

let introChartId = "Fairness-Chart";
let chartId = "Calibration-Chart";

let width = 660;
let height = 480;
let margin = {left: 100, right: 50, top: 50, bottom: 70};

const xScale = d3.scaleLinear()
    .domain([0, 10])
    .range([margin.left, width-margin.right]);

const yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([height-margin.bottom, margin.top]);

const fillScale = d3.scaleOrdinal()
    .domain(["white", "black"])
    .range(["#F50141", "#FD7B03"]);

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

    let tooltip = d3.select(`${introChartId}`)
        .append("div")
        .attr("class", "tooltip");

    d3.selectAll(`${introChartId} a circle`).on("mouseover", function(e, d) {

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

        d3.selectAll(`${chartId} a circle`)
            .attr("stroke", visStyles[style]["borderColor"])
            .attr("stroke-width", 1);
    });
}

function fairnessDefinitions(style = "darkMode") {

    let n = fairnessData.length;
    let theta = ((Math.PI*2) / n);
    let width = 600;
    let height = 520;
    let radius = 95;

    for (let i in fairnessData) {
        fairnessData[i].angle = (theta * i);
        fairnessData[i].x = (radius * Math.cos(fairnessData[i].angle)) + width/2;
        fairnessData[i].y = (radius * Math.sin(fairnessData[i].angle)) + height/2;
        fairnessData[i].xLabel = (radius*1.17 * Math.cos(fairnessData[i].angle)) + width/2;
        fairnessData[i].yLabel = (radius*1.17 * Math.sin(fairnessData[i].angle)) + height/2;
    }

    let svg = d3.select(`#${introChartId}`)
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
        .data(fairnessData)
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
    // transitionHighlight(style);
}

function Information() {
    return (
        <div className="Information">
        </div>
    )
}

function Content() {
    return(
        <div className="Content Three-Column No-Padding-Top">
            <div className="chart" id={chartId}></div>
            <Information/>
        </div>
    )
}

function ImpossibilityTheorem() {
    // select one
    return(
        <div>
            <div className="chart" id={introChartId}></div>
            <h6 className="Small-Margin-Top">Visualization shows twenty definitions of algorithmic fairness. Visualization created using data collected by <NavLink to="/Resources">Verma and Rubin (2018).</NavLink> Click to open journal article about that specific definition of algorithmic fairness.</h6>
        </div>
    )
}

function initGraph() {
    d3.select(`#${chartId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    renderGraph(data);
}

function renderGraph(data) {

    let svg = d3.select(`#${chartId} svg`);

    const grouped_data = d3.group(data, d => d.race);

    const line = d3.line()
        .x(function(d) { return xScale(d.decile); })
        .y(function(d) { return yScale(d.mean); })
        .curve(d3.curveLinear);

    const xAxis = svg.append("g")
        .attr("class", "axis")
        .attr("transform",`translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale).tickFormat(d3.format("Y")));

    const yAxis = svg.append("g")
        .attr("class", "axis")
        .attr("transform",`translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));

    let path = svg
        .selectAll(".line")
        .data(grouped_data)
        .join("path")
            .attr("fill", "none")
            .attr("stroke", function(d){ return fillScale(d[0]);})
            .attr("d", function(d) { return line(d[1]); })
            .attr("stroke-width", 2);

    let circle = svg
      .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
          .attr("cx", function(d) { return xScale(d.decile); })
          .attr("cy", function(d) { return yScale(d.mean); })
          .attr("r",2)
          .attr("fill", d => fillScale(d.race));

    svg.append("text")
          .attr("class","axisLabel")
          .attr("x", width/2)
          .attr("y", height - 10)
          .attr("text-anchor","middle")
          .text("Risk score")
          .attr("fill", "#cbcbcb");
  
    svg.append("text")
          .attr("class","axisLabel")
          .attr("x", -height/2)
          .attr("y", 50)
          .attr("text-anchor","middle")
          .attr("transform","rotate(-90)")
          .text("Likelihood of reoffense")
          .attr("fill", "#cbcbcb");
}

export default function Calibration({config, user, disableFairnessNext, setDisableFairnessNext, modules}) {

    const [isOpen, setIsOpen] = useState(true);
    let navigate = useNavigate(); 
    const routeNext = () => {
      let path = `/Error`; 
      navigate(path);
    }

    const routeBack = () => {
      let path = `/COMPAS`; 
      navigate(path);
    }

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    // useEffect(() => {
    //     setId(isOpen ? "fairness": "calibration");
    // }, [isOpen])

    useEffect(() => {
        fairnessDefinitions();
    }, [])

    useEffect(() => {
        initGraph();
    }, []);

    return (
        <div className="App">{
            isOpen ?
            <Overlay isOpen={isOpen} onClose={toggleOverlay}>
            <div className="Containers-Container">
                <div className="Container-Fill-Secondary No-Padding-Right">
                <h3 className="Page-Title">introduction to algorithmic fairness</h3>
                    <div className="Two-Column-Three">
                        <ImpossibilityTheorem/>
                        <RightSideBar>
                            <div className="Container2 Margin-Bottom">
                                <h4 className="Small-Margin">learn</h4>
                                <p className="No-Margin-Bottom">AI researchers have proposed over twenty mathematical constructions of fairness <NavLink to="/Resources">(Verma and Rubin 2018; Narayanan 2018)</NavLink>. However, <NavLink to="/Resources">Kleinberg et al.'s (2016) </NavLink>research demonstrates that it is <span className="Semi-Bold">impossible</span> to meet multiple definitions if the underlying base rates of a population are unequal.</p>
                                {/* if there are discrepancies in the underlying base rates (prevalence) in a population. */}
                            </div>
                            <Timer user={user} disableNext={disableFairnessNext} setDisableNext={setDisableFairnessNext}>
                                <p>Have you heard of any of these definitions before?</p>
                                <p className="No-Margin-Bottom">Have you used or come across any of these definitions in your work before?</p>
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
                    {/* <p>In May 2016, the investigative newsroom, ProPublica, published an article titled <span className="Emphasis">Machine Bias</span>. The article accused Equivant, the developer of COMPAS, of overlooking encoded racial bias in the algorithm's predictions <NavLink to="/Resources">(Angwin et al. 2016)</NavLink>. </p>
                    <p>The article sparked passionate discourse across industries and disciplines resulting in the replication of the analysis many times over <NavLink to="/Resources">(Flores, Bechtel, and Lowenkamp 2016; Corbett-Davies et al. 2016)</NavLink>.</p>
                    <p className="No-Margin-Bottom">However, the discourse did not result in a consensus supporting claims made by the authors of <span className="Emphasis">Machine Bias</span> or a complete vindication of Equivant. Instead, it sparked several new questions about algorithmically informed decision-making, such as what does it mean for an algorithm to be biased, and alternatively, what does it mean to be fair?</p> */}
                </Description>
                <RoleShort moduleName="fairness"/>
                <Terminology margin="Margin-Large-Bottom">
                    <Term term={terms['calibration']}/>
                    <Term term={terms['mathematical-fairness']}/>
                    <Term term={terms['proxy-variable']}/>
                    <Term term={terms['recidivism']}/>
                </Terminology>
                <BackButton routeBack={routeBack}/>
            </LeftSideBar>
            <Content/>
            <RightSideBar>
                <Progress id={config.id} modules={modules}/>
                <NextButton routeNext={routeNext}/>
            </RightSideBar>
        </div>
        <Footer/>
    </div>
    )
}
