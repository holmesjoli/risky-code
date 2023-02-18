import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
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
        policyDiagram(chartID);
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
                    <div id={chartID} className="chart"></div>
                </div>
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
