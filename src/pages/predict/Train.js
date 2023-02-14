import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import Navigation from '../../components/Navigation';
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Model from "../../components/Model";
import { ActualPredicted } from "../../components/Legend";
import Card from "../../components/Card";
import Regression from "../../components/Regression";
import Accuracy from '../../components/Accuracy';

function Information({items, variables}) {
    return (
        <div>
            <ActualPredicted/>
            <Accuracy items={items} variables={variables}/>
        </div>
    )
}

export function Content({variables, setVariables, items, setItems}) {

    return(
        <div className="Content">
            <div className="Three-Column">
                <Model variables={variables} setVariables={setVariables}/>
                <Regression items={items} setItems={setItems} variables={variables}/>
                <Card items={items} variables={variables}/>
                <Information items={items} variables={variables}/>
            </div>
        </div>
    )
}

export default function Train({config, variables, setVariables, items, setItems, modules}) {

    let navigate = useNavigate(); 
    const routeNext = () => {
      let path = `/Calibration`; 
      navigate(path);
    }

    const routeBack = () => {
      let path = `/Classify`; 
      navigate(path);
    }

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <div className="Sidebar-Left">
                    <Description config={config}/>
                    <div className="Button-Container-Left">
                        <Button variant="outlined" color="secondary" onClick={routeBack}>back</Button>
                    </div>
                </div>
                <Content variables={variables} setVariables={setVariables} items={items} setItems={setItems}/>
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
