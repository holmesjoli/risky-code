import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Overlay from "../../components/Overlay";
import SortBump from "../../components/SortBump";
import { Consequence, Stakeholders } from "../../components/PolicyScenario";
import Terminology from '../../components/Terminology';
import Progress from "../../components/Progress";
import { BackButton, NextButton } from '../../components/Button';
import { LeftSideBar, RightSideBar } from "../../components/Sidebar";

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

    return(
        <div className="Content Two-Column-Three">
            <div>
                <SortBump/>
            </div>
            <div className="Container">
                {/* <div id="Boston-Map" className="chart"></div> */}
                {/* <h6>Map of Boston</h6> */}
            </div>
        </div>
    )
}

export default function StreetBump({config, modules}) {

    const [isOpen, setIsOpen] = useState(true);
    const [id, setId] = useState("cases");
    let chartID = "Policy-Chart2";

    let navigate = useNavigate();

    const routeNext = () => {
        let path = `/COMPAS`; 
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
                <div className="Container-Fill-Secondary">
                    <div className="Overlay-Controls">
                        <h3 className="Page-Title">introduction to case studies</h3>
                        <button
                            className="Overlay-Close"
                            type="button"
                            onClick={toggleOverlay}
                        />
                    </div>
                    <p>Algorithmically informed decision-making tools are now being used in every field. They are used to evaluate prisoners for parole, triage patients in emergency rooms, and predict where and when services might be needed. The next module will look at two different algorithmic case studies and explain how different definitions of fairness apply.</p>
                    <div id={chartID} className="chart"></div>
                    <h6 className="Small-Margin">Visualization shows different policy areas where algorithmically informed-decision making is currently in use. Case studies are highlighed in green. Visualization data created from examples in <NavLink to="/Resources">O'Neil (2016) AINOW (2018), Eubanks (2018), and Obermeyer et al. (2019)</NavLink>.</h6>                </div>
            </div>
        </Overlay>:
        <></>
        }
            <Header/>
            <div className="Main">
                <LeftSideBar>
                    <Description config={config}/>
                    <Terminology>
                    <div className="Container-Rule">
                        <h4>stakeholders</h4>
                        <p>People impacted directly or indirectly by a system <NavLink to="/Resources">(Bender and Friedman 2018)</NavLink></p>
                    </div>
                    </Terminology>
                    <BackButton routeBack={routeBack}/>
                </LeftSideBar>
                <Content />
                <RightSideBar>
                <Progress id={id} modules={modules}/>
                    <Stakeholders/>
                    <Consequence/>
                    <NextButton routeNext={routeNext}/>
                </RightSideBar>
            </div>
            <Footer/>
        </div>
    )
}
