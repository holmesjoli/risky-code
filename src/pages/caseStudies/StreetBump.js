import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Overlay from "../../components/Overlay";
import SortBump from "../../components/SortBump";
import { Consequence, Stakeholders } from "../../components/TrackUserInputs";
import { terms } from '../../utils/global';
import Progress from "../../components/Progress";
import { BackButton, NextButton, NextButtonOverlay } from '../../components/Button';
import { LeftSideBar, RightSideBar, Description, Terminology, Term, RoleAccordion } from "../../components/Sidebar";
import { Button } from '@material-ui/core';
import Timer from "../../components/Timer";

import { policyDiagram } from '../../components/PolicyDiagram';
import * as d3 from 'd3';

import coastline from "../../data/processed/Boston/coastline.json";
import city from "../../data/processed/Boston/city.json";
import park from "../../data/processed/Boston/park.json";

function drawMap() {

    // console.log(window.innerHeight, window.innerWidth)

    const svg = d3
        .select("#Boston-Map")
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .style("background-color", "#fff")
        .attr("viewBox", "0 0 " + window.innerWidth + " " + window.innerHeight)
        .classed("svg-content", true);

    const projection = d3
        .geoAlbers()
        .translate([window.innerWidth / 2, window.innerHeight / 2])
        .scale(40)
        .center([0, 50]);

    let geoPathGenerator = d3
        .geoPath()
        .projection(projection);

    console.log(coastline)
    console.log(city)
    
    svg
        .selectAll("path")
        .data(park.features)
        .enter()
        .append("path")
        // draw each country

        .attr("d", geoPathGenerator)
        .attr("color", "#eeeeee");
}

export function Content() {

    // useEffect(() => {
    //     drawMap();
    // }, [])

    const showResults = () => {
    }

    return(
        <div className="Content Two-Column-Three No-Padding-Top">
            <div>
                <SortBump/>
                <div className="Three-Column-Equal Margin-Top">
                    <div></div>
                    <Button variant="outlined" color="secondary" onClick={showResults}>show results</Button>
                    <div></div>
                </div>
            </div>
            <div className="Container">
                {/* <div id="Boston-Map" className="chart"></div> */}
                {/* <h6>Map of Boston</h6> */}
            </div>
        </div>
    )
}

export default function StreetBump({config, user, modules, disableCaseStudyNext, setDisableCaseStudyNext}) {

    const [isOpen, setIsOpen] = useState(true);
    const [id, setId] = useState("cases");
    let chartID = "Policy-Chart2";

    let navigate = useNavigate();

    const routeNext = () => {
        let path = `/Health`; 
        navigate(path);
      }
  
    const routeBack = () => {
        let path = `/Error`; 
        navigate(path);
    }

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setId(isOpen ? "cases": "street");
    }, [isOpen]);

    useEffect(() => {
        policyDiagram(chartID, 490, 490, "darkMode", true);
    }, []);

    return (
        <div className="App">
            {
            isOpen ?
            <Overlay isOpen={isOpen} onClose={toggleOverlay}>
            <div className="Containers-Container">
                <div className="Container-Fill-Secondary No-Padding-Right">
                    <div className="Two-Column-Three">
                        <div>
                            <h3 className="Page-Title Center">introduction to case studies</h3>
                            <div id={chartID} className="chart Margin-Bottom"></div>
                            <h6>Visualization shows different policy areas where algorithmically informed-decision making is currently in use. Purple nodes indicate which definitions of algorithmic fairness are reviewed in the next module. Visualization data created from examples in <NavLink to="/Resources">O'Neil (2016) AINOW (2018), Eubanks (2018), and Obermeyer et al. (2019)</NavLink>. </h6>
                        </div>
                        <RightSideBar>
                            <div className="Card-Group">
                                <h4>algorithms in use</h4>
                                <p className="No-Margin-Bottom">Algorithmically informed decision-making tools are now being used in every field. They are used to evaluate prisoners for parole, triage patients in emergency rooms, and predict where and when services might be needed. The next module will look at two case studies and explore how different definitions of algorithmic fairness apply.</p>
                            </div>
                            <Timer user={user} disableNext={disableCaseStudyNext} setDisableNext={setDisableCaseStudyNext}>
                                <p>Brainstorm examples of where algorithmically-informed decision-making is used.</p>
                                <p>Pick one scenario and brainstorm some potential consequences (positive and negative) of that example.</p>
                            </Timer>
                            {toggleOverlay? <NextButtonOverlay disabled={disableCaseStudyNext} toggleOverlay={toggleOverlay}/>: <></>}
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
                        <p>Street Bump was an application developed for the city of Boston in 2011 to identify potholes in need of repair. The application relied on people with smartphones to opt-in, download, and open the application during their daily commutes around Boston. The application recorded acceleration and GPS data to help the city identify problem roads.</p>
                    </Description>
                    <RoleAccordion moduleName="caseStudies"/>
                    <Terminology>
                        <Term term={terms['direct stakeholders']}/>
                        <Term term={terms['indirect stakeholders']}/>
                        <Term term={terms['excluded stakeholders']}/>
                        <Term term={terms['fpr']}/>
                    </Terminology>
                    <BackButton routeBack={routeBack}/>
                </LeftSideBar>
                <Content />
                <RightSideBar>
                <Progress id={id} modules={modules}/>
                    <Stakeholders/>
                    <Consequence margin="Margin-Large-Bottom"/>
                    <NextButton routeNext={routeNext}/>
                </RightSideBar>
            </div>
            <Footer/>
        </div>
    )
}
