import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import Description from '../../components/Description';
import Navigation from '../../components/Navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Overlay from "../../components/Overlay";

export function Content() {
    return(
        <div className="Content">
        </div>
    )
}

export default function Stakeholders({config, modules}) {

    const [isOpen, setIsOpen] = useState(true);
    const [id, setId] = useState("deliberation");
    let navigate = useNavigate();

    const routeNext = () => {
        let path = `/Risk`; 
        navigate(path);
      }
  
    const routeBack = () => {
        let path = `/COMPAS`; 
        navigate(path);
    }

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setId(isOpen ? "deliberation": "stakeholders");
    }, [isOpen])

    return (
        <div className="App">{
            isOpen ?
            <Overlay isOpen={isOpen} onClose={toggleOverlay}>
            <div className="Containers-Container">
                <div className="Container">
                    <div className="Overlay-Controls">
                        <h3>introduction to deliberation</h3>
                        <button
                            className="Overlay-Close"
                            type="button"
                            onClick={toggleOverlay}
                        />
                    </div>
                    <p>Many of the algorithms intervening in decisions are considered high-stakes public policy decision-making cases (e.g., predict child maltreatment, automated recruitment decisions, college admissions, etc.). However, not all public policy decisions are as high-stakes. The last module showed two examples of when algorithmically informed decision-making has been used. The goal of this module is to visually assess risk across numerous dimensions to answer the question, <span className="Italic">is it appropriate to use algorithmic decision-making for my specific public policy use case?</span></p>
                        <p></p>
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
