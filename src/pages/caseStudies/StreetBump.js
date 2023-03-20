import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Overlay from "../../components/Overlay";
import { Consequence } from "../../components/TrackUserInputs";
import { terms } from '../../utils/global';
import Progress from "../../components/Progress";
import { BackButton, NextButton, NextButtonOverlay } from '../../components/Button';
import { LeftSideBar, RightSideBar, Description, Terminology, Term } from "../../components/Sidebar";
import StakeholderMapping from "../../components/StakeholderMapping";
import { RoleShort } from "../../components/Role";

import { policyDiagram } from '../../components/PolicyDiagram';
import * as d3 from 'd3';
import SortStakeholders from "../../components/SortStakeholders";


// import coastline from "../../data/processed/Boston/coastline.json";
// import city from "../../data/processed/Boston/city.json";
// import park from "../../data/processed/Boston/park.json";

// function drawMap() {

//     // console.log(window.innerHeight, window.innerWidth)

//     const svg = d3
//         .select("#Boston-Map")
//         .append("svg")
//         .attr("preserveAspectRatio", "xMinYMin meet")
//         .style("background-color", "#fff")
//         .attr("viewBox", "0 0 " + window.innerWidth + " " + window.innerHeight)
//         .classed("svg-content", true);

//     const projection = d3
//         .geoAlbers()
//         .translate([window.innerWidth / 2, window.innerHeight / 2])
//         .scale(40)
//         .center([0, 50]);

//     let geoPathGenerator = d3
//         .geoPath()
//         .projection(projection);

//     console.log(coastline)
//     console.log(city)
    
//     svg
//         .selectAll("path")
//         .data(park.features)
//         .enter()
//         .append("path")
//         // draw each country

//         .attr("d", geoPathGenerator)
//         .attr("color", "#eeeeee");
// }

export default function StreetBump({config, user, modules}) {

    const [isOpen, setIsOpen] = useState(true);
    const [id, setId] = useState("cases");
    let chartID = "Policy-Chart2";

    let navigate = useNavigate();

    const routeNext = () => {
        let path = `/Health`; 
        navigate(path);
    }
  
    const routeBack = () => {
        let path = `/StakeholderMapping`; 
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
                            <h3 className="Page-Title Small-Margin Padding-">stakeholder mapping for street bump</h3>
                            <div className="Medium-Margin-Top">
                                <SortStakeholders/>
                                {/* <div id={chartID} className="chart Margin-Bottom"></div> */}
                                {/* <h6>Visualization shows different policy areas where algorithmically informed-decision making is currently in use. Purple nodes indicate which definitions of algorithmic fairness are reviewed in the next module. Visualization data created from examples in <NavLink to="/Resources">O'Neil (2016) AINOW (2018), Eubanks (2018), and Obermeyer et al. (2019)</NavLink>. </h6> */}
                            </div>
                        </div>
                        <RightSideBar>
                            <div className="Container2">
                                <h3>learn</h3>
                                <p className="No-Margin-Bottom">Street Bump was an application developed for the city of Boston in 2011 to identify potholes in need of repair. The application relied on people with smartphones to opt-in, download, and open the application during their daily commutes around Boston. The application recorded acceleration and GPS data to help the city identify road problems.</p>
                            </div>
                            <div className="Container2">
                                <h3>brainstorm</h3>
                                <p className="No-Margin-Bottom">Start by brainstorming who the direct stakeholders of Street Bump would be. Are there any indirect stakeholders? Is anyone excluded from the using the application?</p>
                            </div>
                            <NextButtonOverlay toggleOverlay={toggleOverlay}/>
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
                    <p>Create a stakeholder map for stakeholders of the Street Bump application. </p>
                    <p>Then add your brainstorm to the map to see how the stakeholders' values overlap.</p>
                </Description>
                <RoleShort moduleName="caseStudies"/>
                <Terminology margin="Margin-Large-Bottom">
                    <Term term={terms['direct stakeholders']}/>
                    <Term term={terms['indirect stakeholders']}/>
                    <Term term={terms['excluded stakeholders']}/>
                    {/* <Term term={terms['fpr']}/> */}
                </Terminology>
                <BackButton routeBack={routeBack}/>
            </LeftSideBar>
            <StakeholderMapping />
            <RightSideBar>
            <Progress id={id} modules={modules}/>
                <Consequence margin="Margin-Large-Bottom"/>
                <NextButton routeNext={routeNext}/>
            </RightSideBar>
        </div>
        <Footer/>
    </div>
    )
}
