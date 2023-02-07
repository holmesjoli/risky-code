import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import Navigation from '../../components/Navigation';
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Model from "../../components/Model";
import Legend from "../../components/Legend";
import Card from "../../components/Card";
import Regression from "../../components/Regression";

function Information() {
    return (
        <div className="Information">
            <div className="Legend Container">
                <h4>Legend</h4>
                <h5>Classified</h5>
                <div>
                    <div className="Legend-Card">
                        <h6>Hot water load</h6>
                        <div className="Card"></div>
                    </div>
                    <div className="Legend-Card">
                        <h6>Save for later load</h6>
                        <div className="Card Case-False"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Content({config, variables, setVariables, items, setItems}) {

    let navigate = useNavigate(); 
    const routeNext = () => {
      let path = `/Optimize`; 
      navigate(path);
    }

    const routeBack = () => {
      let path = `/Classify`; 
      navigate(path);
    }

    return(
        <div className="Content">
            <h2 className="Title">{config.title}</h2>
            <div className="Three-Column">
                <Model variables={variables} setVariables={setVariables}/>
                <Regression items={items} setItems={setItems} variables={variables}/>
                <Card items={items} variables={variables}/>
                <Information/>
            </div>
            <div className="Button-Container">
                <Button variant="outlined" color="secondary" onClick={routeBack}>Back</Button>
                <Button variant="contained" className="Next" onClick={routeNext}>Next</Button>
            </div>
        </div>
    )
}

export default function Train({config, variables, setVariables, items, setItems}) {
    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <div className="Sidebar">
                    <Navigation/>
                    <Description config={config}/>
                </div>
                <Content config={config} variables={variables} setVariables={setVariables} items={items} setItems={setItems}/>
            </div>
            <Footer/>
        </div>
    )
}