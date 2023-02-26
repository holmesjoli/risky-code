import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Terminology from '../../components/Terminology';
import Stakeholders from "../../components/Stakeholders";
import Progress from "../../components/Progress";
import { BackButton, NextButton } from '../../components/Button';
import { LeftSideBar, RightSideBar } from "../../components/Sidebar";
import { Slider } from '@material-ui/core' ;
import * as d3 from 'd3';
import data from "../../data/processed/compas.json";

let chartId = "COMPAS-Chart"
let width = 650;
let height = 500;
let style = "darkMode";

function initGraph(data) {
    d3.select(`#${chartId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // renderNetwork(data);
}

export function Content() {

    useEffect(() => {
        initGraph(data);
    }, [])

    return(
        <div className="Content">
            <div className="Three-Column3">
                <div>
                    <div className="Container">
                        <h3>predicted probability of reoffense</h3>
                        <p>Use the slider to adjust at what threshold defendants should be considered high-risk of reoffense.</p>
                        <Slider
                            size="small"
                            defaultValue={40}
                            min={10}
                            max={100}
                            step={10}
                            aria-label="Small"
                            valueLabelDisplay="auto"
                            />
                    </div>
                </div>
                <div>
                    <div className="Container">
                        <h3>the compas algorithm's recidivism predictions</h3>
                        <div id={chartId}></div>
                    </div>
                </div>
                <div>
                    <div className="Container">
                        <h3>legend</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function COMPAS({config, modules}) {

    let navigate = useNavigate();

    const routeNext = () => {
        let path = `/Stakeholders`; 
        navigate(path);
      }

    const routeBack = () => {
        let path = `/StreetBump`; 
        navigate(path);
    }

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <LeftSideBar>
                    <Description config={config}/>
                    <Terminology>
                        <div className="Container-Rule">
                                <h4>recidivism</h4>
                                <p>A criminal reoffense</p>
                        </div>
                        <div className="Container-Rule">
                            <h4>stakeholders</h4>
                            <p>People impacted directly or indirectly by a system <NavLink to="/Resources">(Bender and Friedman 2018)</NavLink></p>
                        </div>
                    </Terminology>
                    <BackButton routeBack={routeBack}/>
                </LeftSideBar>
                <Content />
                <RightSideBar>
                <Progress id={config.id} modules={modules}/>
                    <Stakeholders/>
                    <NextButton routeNext={routeNext}/>
                </RightSideBar>
            </div>
            <Footer/>
        </div>
    )
}
