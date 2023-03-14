import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import * as d3 from 'd3';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Overlay from "../../components/Overlay";
import data from "../../data/processed/mathematical_fairness.json"
import { wrap, visStyles } from "../../utils/global";
import { terms } from '../../utils/global';
import Progress from "../../components/Progress";
import { BackButton, NextButton, NextButtonOverlay } from '../../components/Button';
import { LeftSideBar, RightSideBar, Description, Terminology, Term } from "../../components/Sidebar";
import { transitionHighlight } from '../../components/PolicyDiagram';
import Timer from "../../components/Timer";

function Information() {
    return (
        <div className="Information">
        </div>
    )
}

export function Content() {
    return(
        <div className="Content Three-Column No-Padding-Top">
            <Information/>
        </div>
    )
}

export default function Calibration({config, modules}) {

    let navigate = useNavigate(); 
    const routeNext = () => {
      let path = `/Error`; 
      navigate(path);
    }

    const routeBack = () => {
      let path = `/COMPAS`; 
      navigate(path);
    }

    return (
        <div className="App">
        <Header/>
        <div className="Main">
            <LeftSideBar>
                <Description config={config}>
                </Description>
                <Terminology margin="Margin-Large-Bottom">
                    <Term term={terms['calibration']}/>
                    <Term term={terms['mathematical-fairness']}/>
                    <Term term={terms['proxy-variable']}/>
                    <Term term={terms['recidivism']}/>
                </Terminology>
                <BackButton routeBack={routeBack}/>
            </LeftSideBar>
            <Content/>
            <RightSideBar>
                <Progress id={config.id} modules={modules}/>
                <NextButton routeNext={routeNext}/>
            </RightSideBar>
        </div>
        <Footer/>
    </div>
    )
}
