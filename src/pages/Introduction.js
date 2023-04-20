import React from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Progress from '../components/Progress';
import { useEffect } from 'react';
import { policyDiagram } from '../components/PolicyDiagram';
import { NextButton } from '../components/Button';
import { LeftSideBar, RightSideBar, Description, Terminology, Term } from "../components/Sidebar";
import { terms } from '../utils/global';

export function Content() {

    let chartID = "Policy-Chart";

    useEffect(() => {
        policyDiagram(chartID);
    }, [])

    return(
        <div className="Content Two-Column-Three No-Padding-Top">
            <div>
                <div className="Container">
                    <h3 className="No-Margin-Bottom">explore</h3>
                    <div id={chartID} className="chart"></div>
                    <h6 className="Small-Margin">Visualization shows different policy areas where algorithmically informed-decision making is currently in use. Visualization data created from examples in <NavLink to="/Resources">O'Neil (2016) AINOW (2018), Eubanks (2018), and Obermeyer et al. (2019)</NavLink>. Click on a node to connect to more information on algorithmically informed decision-making in public policy.</h6>
                </div>
            </div>
            <div>
                <div className="Container">
                    <h3 className="Medium-Margin">learn</h3>
                    <p>Hover over nodes on the visualization to the left to explore different examples where algorithmically informed decision-making is currently in use in public policy.</p>
                </div>
            </div>
        </div>
    )
}

export default function Introduction({config, modules, state, remaining}) {

    let navigate = useNavigate(); 
    const routeNext = () => {
      let path = `/Classify`; 
      navigate(path);
    }

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <LeftSideBar>
                <Description config={config}>
                    <p>Welcome to <span className="Emphasis">Risky Code</span>, an interactive digital toolkit designed to inform and to facilitate deliberation about algorithmically informed decision-making.</p>
                    <p><span className="Emphasis">Risky Code</span> contains four modules <span className="Emphasis">Predict</span>, <span className="Emphasis">Fairness</span>, <span className="Emphasis">Case Studies</span>, <span className="Emphasis">Deliberation</span>.</p>
                    <p>When you're ready, click <span className="Emphasis">Next</span> to get started.</p>
                </Description>
                    <Terminology defaultExpanded={true}>
                        <Term term={terms.aidm}></Term>
                    </Terminology>
                </LeftSideBar>
                <Content />
                <RightSideBar>
                    <Progress id={config.id} modules={modules} defaultExpanded={true}/>
                    <NextButton routeNext={routeNext}/>
                </RightSideBar>
            </div>
            <Footer/>
        </div>
    )
}
