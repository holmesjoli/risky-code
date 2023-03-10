import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import * as d3 from 'd3';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Overlay from "../../components/Overlay";
import Progress from "../../components/Progress";
import { BackButton, NextButton, NextButtonOverlay } from '../../components/Button';
import SortLaundry from "../../components/SortLaundry";
import { LeftSideBar, RightSideBar, Description, Terminology, Term } from "../../components/Sidebar";
import Timer from "../../components/Timer";
import { visStyles, terms } from "../../utils/global";
import { AlgorithmDefinition } from '../../components/TrackUserInputs';

let chartId = "brainstorm-terms";
let width = 600;
let height = 275;
let style = "darkMode";

const algoTerms = [{"term": "automated"}, 
                   {"term": "rule"}, 
                   {"term": "objective"}, 
                   {"term": "subjective"}, 
                   {"term": "neutral"}, 
                   {"term": "unbiased"},
                   {"term": "biased"}, 
                   {"term": "instructions"}, 
                   {"term": "program"}, 
                   {"term": "machine learning"}, 
                   {"term": "artificial intelligence (AI)"}, 
                   {"term": "step"}, 
                   {"term": "calculation"}, 
                   {"term": "task"}, 
                   {"term": "function"},
                   {"term": "code"},
                   {"term": "manual"},
                   {"term": "analog"},
                   {"term": "process"},
                   {"term": "procedure"},
                   {"term": "mathematics"},
                   {"term": "system"}];

export function transitionHighlightBack() {
    d3.selectAll(".brainstorm-term")
        .transition()
        .ease(d3.easePoly)
        // .delay((d, i) => i*2000)
        .duration(1000)
        .delay(function(d, i){return(i*1000 + 1000)})
        // .duration((d, i) => i*1000)
        .attr("fill", visStyles[style]["textColor"])
        .attr("font-weight", 400)
        .on('end', transitionHighlight);
}

export function transitionHighlight() {
    d3.selectAll(".brainstorm-term")
        .transition()
        .ease(d3.easePoly)
        .duration(1000)
        .delay(function(d, i) {return(i*1000 + 2000)})
        .attr("fill", visStyles[style]["textHighlightColor"])
        .attr("font-weight", 500)
        .on('end', transitionHighlightBack);
}

function initNetwork() {
    let svg = d3.select(`#${chartId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    let simulation = d3.forceSimulation()
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().strength(5.5).radius(20))
        .force('x', d3.forceX().x(function (d) {
            return width/2;
        }).strength(.03))
        .force('y', d3.forceY().y(function (d) {
            return height/2;
        }).strength(.03))
        .on("tick", ticked);

    let text = svg.append("g")
        .selectAll("text");

        text = svg
        .selectAll("text")
        .data(algoTerms, d => d.term)
        .join(
            enter  => enter.append("text")
                .attr("fill", visStyles[style]["textColor"])
                .attr("font-size", visStyles[style]["fontSize"])
                .attr("font-weight", 400)
                .attr("cursor", "default")
                .attr("letter-spacing", ".6px")
                .attr("class", "brainstorm-term")
                .text(d => d.term)
    );

    function ticked() {

        text
            .attr("x", function (d) { return d.x + 10; })
            .attr("y", function (d) { return d.y - 10; });
    }

    simulation.nodes(algoTerms);
    simulation.alpha(1).restart();

    transitionHighlight();
}

export function Content({items, setItems, nClassified, setNClassified, setDisabled}) {

    return(
        <div className="Content No-Padding-Top">
            <SortLaundry items={items} setItems={setItems} nClassified={nClassified} setNClassified={setNClassified} setDisabled={setDisabled}/>
        </div>
    )
}

export default function Classify({config, user, disablePredictionNext, setDisablePredictionNext, items, setItems, modules, algorithmDefinition, setAlgorithmDefinition}) {

    const [id, setId] = useState("predict");
    const [isOpen, setIsOpen] = useState(true);
    const [nClassified, setNClassified] = useState(0);
    const [disabled, setDisabled] = useState(true);

    let navigate = useNavigate();

    const routeNext = () => {
      let path = `/Train`; 
      navigate(path);
    }

    const routeBack = () => {
      let path = `/Introduction`; 
      navigate(path);
    }

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setId(isOpen ? "predict": "classify");
    }, [isOpen])

    useEffect(() => {
        initNetwork();
    }, []);

    return (
        <div className="App">
            {isOpen ?
                <Overlay isOpen={isOpen} onClose={toggleOverlay}>
                <div className="Containers-Container">
                    <div className="Container-Fill-Secondary">
                        <div className="Two-Column-Three">
                            <div>
                                <h3 className="Page-Title">introduction to algorithmic decision-making</h3>
                                <div className="Card-Group">
                                    <h4>what's in an algorithm?</h4>
                                    <p>Use these terms to get started brainstorming.</p>
                                    <div className="chart" id={chartId}></div>
                                </div>
                                <AlgorithmDefinition algorithmDefinition={algorithmDefinition} setAlgorithmDefinition={setAlgorithmDefinition}/>
                            </div>
                            <RightSideBar>
                                <div className="Card-Group">
                                    <h4>algorithmically informed decision-making</h4>
                                    <p>This research defines algorithmically informed decision making as <span className="Emphasis">a system that uses automated reasoning to aid or replace a decision-making process that would otherwise be performed by humans <NavLink to="/Resources">(AINOW 2018)</NavLink></span></p>
                                    <p className="No-Margin-Bottom">Algorithmically informed decision-making is often also called algorithmic or automated decision-making. The term algorithmic decision-making has been modified in this research to include the word <span className="Emphasis">informed</span> in recognition of the reality that most automated systems are only semi-automatic and have some level of human interaction and oversight.</p>
                                </div>
                                <Timer user={user} disableNext={disablePredictionNext} setDisableNext={setDisablePredictionNext}>
                                    <p>How do you define the term algorithm?</p>
                                    <p>Brainstorm multiple examples of algorithms in use in your life.</p>
                                </Timer>
                                {toggleOverlay? <NextButtonOverlay disabled={disablePredictionNext} toggleOverlay={toggleOverlay}/>: <></>}
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
                    <Description config={config}/>
                    <Terminology margin="Margin-Large-Bottom">
                        <Term term={terms['algorithm']}/>
                        <Term term={terms['data-variable']}/>
                        <Term term={terms['model-variable']}/>
                    </Terminology>
                    <BackButton routeBack={routeBack}/>
                </LeftSideBar>
                <Content items={items} setItems={setItems} nClassified={nClassified} setNClassified={setNClassified} setDisabled={setDisabled}/>
                <RightSideBar>
                    <Progress id={id} modules={modules}/>
                    <NextButton routeNext={routeNext} disabled={disabled}/>
                </RightSideBar>
            </div>
            <Footer/>
        </div>
    )
}
