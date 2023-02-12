import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from "@material-ui/core";
import Navigation from '../../components/Navigation';
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sort from "../../components/Sort";
import { useState} from "react";

export function Content({items, setItems, navigate}) {

    const [nClassified, setNClassified] = useState(0);

    const routeNext = () => {
        let path = `/Train`; 
        navigate(path);
    }  

    return(
        <div className="Content">
            <Sort items={items} setItems={setItems} nClassified={nClassified} setNClassified={setNClassified}/>
            <div className="Button-Container">
                <Tooltip title="Classify each item to advance">
                    <span>
                    <Button variant="contained" disabled={nClassified !== items.length} onClick={routeNext}>Next</Button>
                    </span>
                </Tooltip>
            </div>
        </div>
    )
}

export default function Classify({config, items, setItems}) {

    let navigate = useNavigate(); 
    const routeBack = () => {
        let path = `/`; 
        navigate(path);
      }  

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <div className="Sidebar">
                    <Description config={config}/>
                    <Button variant="outlined" color="secondary" onClick={routeBack}>Back</Button>
                </div>
                <div>
                    <Navigation id={config.id}/>
                    <Content items={items} setItems={setItems} navigate={navigate}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
