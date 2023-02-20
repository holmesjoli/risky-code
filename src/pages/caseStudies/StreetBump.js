import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import { Button } from "@material-ui/core";
import Description from '../../components/Description';
import Navigation from '../../components/Navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Overlay from "../../components/Overlay";
import { policyDiagram } from '../../components/PolicyDiagram';

export function Content() {
    return(
        <div className="Content">
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
                <div className="Container">
                    <div className="Overlay-Controls">
                        <h3>introduction to case studies</h3>
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
                <div className="Sidebar-Left">
                    <Description config={config}/>
                </div>
                <Content />
                <div className="Sidebar-Right">
                    <div className="Button-Container-Right">
                        <Button variant="outlined" color="secondary" onClick={routeBack}>back</Button>
                        <Button variant="contained" className="Next" onClick={routeNext}>next</Button>
                    </div>
                    <Navigation id={id} modules={modules}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
