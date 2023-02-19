import React from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import Description from '../components/Description';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from "@material-ui/core";
import { useEffect } from 'react';
import { policyDiagram } from '../components/PolicyDiagram';

export function Content() {

    let chartID = "Policy-Chart";

    useEffect(() => {
        policyDiagram(chartID);
    }, [])

    return(
        <div className="Content Two-Column">
            <div className="Container">
            <div id={chartID} className="chart"></div>
            <h6>Visualization shows different policy areas where algorithmically informed-decision making is currently in use. Visualization created from data in AINOW (2018) and Obermeyer et al. (2019).</h6>
            </div>
            <div className="Container">
                <p>In May 2016, the investigative newsroom, ProPublica, published an article titled <em>Machine Bias</em>. The article accused Equivant (formerly Northepointe), the developer of COMPAS, a recidivism algorithm, of overlooking encoded racial bias in the algorithm's predictions <NavLink to="/Resources">(Angwin et al. 2016)</NavLink>. The article sparked passionate discourse across industries and disciplines — journalists, lawyers, data scientists, and mathematicians — resulting in the replication of the analysis many times over <NavLink to="/Resources">(Flores, Bechtel, and Lowenkamp 2016; Corbett-Davies et al. 2016)</NavLink>.</p>
                <p>However, the discourse did not result in a consensus supporting claims made by the authors of Machine Bias or a complete vindication of Equivant. Instead, it sparked several new questions enshroud with complexity about algorithmically informed decision-making — what does it mean for an algorithm to be biased, and alternatively, what does it mean to be fair?</p>
            </div>
        </div>
    )
}

export default function Introduction({config, modules}) {

    let navigate = useNavigate(); 
    const routeNext = () => {
      let path = `/Classify`; 
      navigate(path);
    }

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <div className="Sidebar-Left">
                    <Description config={config}/>
                </div>
                <Content />
                <div className="Sidebar-Right">
                    <div className="Button-Container-Right">  
                        <Button variant="contained" className="Next" onClick={routeNext}>next</Button>
                    </div>
                    <Navigation id={config.id} modules={modules}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}