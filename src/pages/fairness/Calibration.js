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
      let path = `/Train`; 
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
                <div className="Sidebar">
                    <Description config={config}/>
                    <div className="Button-Container">
                        <Button variant="outlined" color="secondary" onClick={routeBack}>back</Button>
                        <Button variant="contained" className="Next" onClick={routeNext}>next</Button>
                    </div>
                    <Navigation id={config.id} modules={modules} setModules={setModules}/>
                </div>
                <Content items={items} setItems={setItems}/>
            </div>
            <Footer/>
        </div>
    )
}