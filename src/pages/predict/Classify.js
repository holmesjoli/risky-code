import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from "@material-ui/core";
import Navigation from '../../components/Navigation';
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sort from "../../components/Sort";
import { useState } from "react";

export function Content({items, setItems, nClassified, setNClassified}) {

    return(
        <div className="Content">
            <Sort items={items} setItems={setItems} nClassified={nClassified} setNClassified={setNClassified}/>
        </div>
    )
}

export default function Classify({config, items, setItems, modules, setModules}) {

    const [nClassified, setNClassified] = useState(0);

    let navigate = useNavigate(); 
    const routeNext = () => {
      let path = `/Train`; 
      navigate(path);
    }

    const routeBack = () => {
      let path = `/`; 
      navigate(path);
    }

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <div className="Sidebar-Left">
                    <Description config={config}/>
                    <div className="Button-Container">
                        <Button variant="outlined" color="secondary" onClick={routeBack}>back</Button>
                        <Button variant="contained" className="Next" disabled={nClassified !== items.length} onClick={routeNext}>next</Button>
                    </div>
                </div>
                <Content items={items} setItems={setItems} nClassified={nClassified} setNClassified={setNClassified}/>
                <div className="Sidebar-Right">
                    <Navigation id={config.id} modules={modules} setModules={setModules}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
