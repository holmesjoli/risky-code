import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import { Button } from "@material-ui/core";
import * as d3 from 'd3';
import Legend from "../../components/Legend";
import Navigation from '../../components/Navigation';
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Overlay from "../../components/Overlay";
import data from "../../data/processed/mathematical_fairness.json"
import { wrap, highlightColor } from "../../utils/global";

// const fillScale = d3.scaleOrdinal()
//     .domain()
//     .range()

function textAngle(angle) {
    return (180/Math.PI)*angle;
}

// Tooltip
function renderTooltip() {

    let tooltip = d3.select("#Fairness-Chart")
        .append("div")
        .attr("class", "tooltip");

    d3.selectAll("#Fairness-Chart circle").on("mouseover", function(e, d) {

        let thisCircle = d3.select(this);
        let x = e.layerX + 20;
        let y = e.layerY - 10;

        tooltip.style("visibility", "visible")
            .style("top", `${y}px`)
            .style("left", `${x}px`)
            .html(`${d.fairness_definition} <br> ${d.author} <br> ${d.angle}`);

        thisCircle
            .attr("stroke", highlightColor)
            .attr("stroke-width", 2);

    }).on("mouseout", function() {

        tooltip.style("visibility", "hidden");

        d3.selectAll("#Fairness-Chart circle")
            .attr("stroke", "#272B30")
            .attr("stroke-width", 1);
    });
}

function fairnessDefinitions() {

    let n = data.length;
    let theta = ((Math.PI*2) / n);
    let width = 650;
    let height = 575;
    let radius = 125; 

    for (let i in data) {
        data[i].angle = (theta * i);
        data[i].x = (radius * Math.cos(data[i].angle)) + width/2;
        data[i].y = (radius * Math.sin(data[i].angle)) + height/2;
        data[i].xLabel = (radius*1.17 * Math.cos(data[i].angle)) + width/2;
        data[i].yLabel = (radius*1.17 * Math.sin(data[i].angle)) + height/2;
    }

    let svg = d3.select("#Fairness-Chart")
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
        .enter()

    svg
        .append("a")
        .attr("href", d=> d.link)
        .attr("target", "_blank")
        .append("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 10)
        .attr("fill", "#131517")
        .attr("stroke", "#272B30")
        .attr("stroke-width", 1.5)
        .attr("class", "shadow");

    svg.append("text")
        .attr("transform", d => `translate(${d.xLabel},${d.yLabel}) rotate(${textAngle(d.angle)})`)
        .attr("text-anchor", "start")
        .attr("alignment-baseline", "bottom")
        .attr("fill", "#d8d8d8")
        .attr("font-size", 11)
        .text(d => d.fairness_definition)
        // .call(wrap, 100);

    renderTooltip();
}

function Information() {
    return (
        <div className="Information">
        </div>
    )
}

export function Content({items, setItems}) {
    return(
        <div className="Content Three-Column">
            <Information/>
        </div>
    )
}

export default function Classify({config, items, setItems, modules}) {

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
                <div className="Container">
                    <div className="Overlay-Controls">
                        <h3>introduction to fairness</h3>
                        <button
                            className="Overlay-Close"
                            type="button"
                            onClick={toggleOverlay}
                        />
                    </div>
                    <p>AI researchers have proposed over 20 mathematical constructions of fairness <NavLink to="/Resources">(Verma and Rubin 2018; Narayanan 2018)</NavLink>. Specifically, this module will review the <span className="Semi-Bold">calibration rate</span>, <span className="Semi-Bold">false positive rate</span>, and <span className="Semi-Bold">false negative rate</span>. In this module, we will learn how to calibrate the model to optimize for these different definitions and see how optimizing for one definition affects the other definitions.</p>
                    <div className="chart" id="Fairness-Chart"></div>
                    <h5>Visualization created using data collected by Verma and Rubin (2018).</h5>
                </div>
            </div>
        </Overlay>:
        <></>
        }
            <Header/>
            <div className="Main">
                <div className="Sidebar-Left">
                    <Description config={config}/>
                    <div className="Button-Container-Left">
                        <Button variant="outlined" color="secondary" onClick={routeBack}>back</Button>
                    </div>
                </div>
                <Content items={items} setItems={setItems}/>
                <div className="Sidebar-Right">
                    <div className="Button-Container-Right">
                        <Button variant="contained" className="Next" onClick={routeNext}>next</Button>
                    </div>
                    <Navigation id={id} modules={modules}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}