import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from "@material-ui/core";
import Legend from "../../components/Legend";
import Navigation from '../../components/Navigation';
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Information() {
    return (
        <div className="Information">
            <Legend componentType={"points"}/>
        </div>
    )
}

export function Content({items, setItems}) {
    return(
        <div className="Content Three-Column">
            <Information/>
        </div>
    )
}

export default function Classify({config, items, setItems, modules, setModules}) {

    let navigate = useNavigate(); 
    const routeNext = () => {
      let path = `/FalsePositive`; 
      navigate(path);
    }

    const routeBack = () => {
      let path = `/Train`; 
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
                <Content items={items} setItems={setItems}/>
                <div className="Sidebar-Right">
                    <div className="Button-Container-Right">
                        <Button variant="contained" className="Next" onClick={routeNext}>next</Button>
                    </div>
                    <Navigation id={config.id} modules={modules} setModules={setModules}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}