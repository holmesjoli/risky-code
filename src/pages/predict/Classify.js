import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from "@material-ui/core";
import Navigation from '../../components/Navigation';
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sort from "../../components/Sort";
import { useState} from "react";

export function Content({config, items, setItems, nClassified, setNClassified}) {

    return(
        <div className="Content">
            <Sort items={items} setItems={setItems} nClassified={nClassified} setNClassified={setNClassified}/>
        </div>
    )
}

export default function Classify({config, items, setItems}) {

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
                <div className="Sidebar">
                    <Description config={config}/>
                    <div className="Button-Container">
                        <Button variant="outlined" color="secondary" onClick={routeBack}>back</Button>
                        <Tooltip title="Classify each item to advance">
                            <span>
                            <Button variant="contained" className="Next" disabled={nClassified !== items.length} onClick={routeNext}>next</Button>
                            </span>
                        </Tooltip>
                    </div>
                    <Navigation/>
                </div>
                <Content config={config} items={items} setItems={setItems} nClassified={nClassified} setNClassified={setNClassified}/>
            </div>
            <Footer/>
        </div>
    )
}
