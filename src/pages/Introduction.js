import React from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import Description from '../components/Description';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Progress from '../components/Progress';
import { useEffect } from 'react';
import { policyDiagram } from '../components/PolicyDiagram';
import { Terminology, Term } from '../components/Terminology';
import { NextButton } from '../components/Button';
import { LeftSideBar, RightSideBar } from "../components/Sidebar";
import { terms } from '../utils/global';

export function Content() {

    let chartID = "Policy-Chart";

    useEffect(() => {
        policyDiagram(chartID);
    }, [])

    return(
        <div className="Content Two-Column-Three">
            <div>
                <div className="Container">
                    <div id={chartID} className="chart"></div>
                    <h6 className="Small-Margin">Visualization shows different policy areas where algorithmically informed-decision making is currently in use. Visualization data created from examples in <NavLink to="/Resources">O'Neil (2016) AINOW (2018), Eubanks (2018), and Obermeyer et al. (2019)</NavLink>. Click on a node to connect to more information on algorithmically informed decision-making in public policy.</h6>
                </div>
            </div>
            <div>
                <div className="Container">
                    <p>In May 2016, the investigative newsroom, ProPublica, published an article titled <em>Machine Bias</em>. The article accused Equivant (formerly Northepointe), the developer of COMPAS, a recidivism algorithm, of overlooking encoded racial bias in the algorithm's predictions <NavLink to="/Resources">(Angwin et al. 2016)</NavLink>. The article sparked passionate discourse across industries and disciplines — journalists, lawyers, data scientists, and mathematicians — resulting in the replication of the analysis many times over <NavLink to="/Resources">(Flores, Bechtel, and Lowenkamp 2016; Corbett-Davies et al. 2016)</NavLink>.</p>
                    <p>However, the discourse did not result in a consensus supporting claims made by the authors of Machine Bias or a complete vindication of Equivant. Instead, it sparked several new questions enshroud with complexity about algorithmically informed decision-making — what does it mean for an algorithm to be biased, and alternatively, what does it mean to be fair?</p>
                    <p>Hover over nodes on the visualization to the left to explore different examples where algorithmically informed decision-making is currently in use in public policy.</p>
                </div>
            </div>
        </div>
    )
}

export default function Introduction({config, modules}) {

    let navigate = useNavigate(); 
    const routeNext = () => {
      let path = `/Train`; 
      navigate(path);
    }

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <LeftSideBar>
                    <Description config={config}/>
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
