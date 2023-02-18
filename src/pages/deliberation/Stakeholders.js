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
                </div>
            </div>
        </Overlay>:
        <></>
        }
        <Header/>
        <div className="Main">
            <div className="Sidebar-Left">
                <Description config={config}/>
                <div className="Button-Container-Left">
                        <Button variant="outlined" color="secondary" onClick={routeBack}>back</Button>
                </div>
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
