import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Progress from "../../components/Progress";
import { PolicyScenario } from "../../components/TrackUserInputs";
import { BackButton, NextButton } from '../../components/Button';
import { LeftSideBar, RightSideBar, Description, Terminology, Term } from "../../components/Sidebar";
import { terms } from '../../utils/global';
import { RoleShort } from "../../components/Role";

let chartId = "Risk-Chart";
let legendId = "Risk-Legend";

let width = 660;
let height = 460;
let style = "darkMode";
let margin = {left: 70, right: 30, top: 30, bottom: 70};

function initGraph(data) {
    d3.select(`#${chartId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.select(`#${chartId}`)
        .append("div")
        .attr("class", "tooltip");

    renderGraph(data);
}


function renderGraph(data) {

    let svg = d3.select(`#${chartId} svg`);
}


export function Content() {
    return(
        <div className="Content One-Column-Three4 No-Padding-Top">
            <div className="Container Margin-Bottom">
                <h4 className="No-Margin-Bottom">visualize</h4>
                <div id={chartId} className="chart"></div>
                <h4>legend</h4>
                <div id={legendId} className="Small-Margin-Bottom"></div>
                <h6 className="Small-Margin-Top"></h6>
            </div>
        </div>
    )
}

export default function Risk({config, modules, policy, setPolicy, data}) {

    let navigate = useNavigate();

    const routeNext = () => {
        let path = `/Decision`; 
        navigate(path);
    }

    const routeBack = () => {
        let path = `/Policy`;
        navigate(path);
    }

    useEffect(() => {
        initGraph(data);
    }, []);

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <LeftSideBar>
                    <Description config={config}>
                    </Description>
                    <RoleShort moduleName="deliberation"/>
                    <BackButton routeBack={routeBack}/>
                </LeftSideBar>
                <Content />
                <RightSideBar>
                    <Progress id={config.id} modules={modules}/>
                    <PolicyScenario policy={policy} setPolicy={setPolicy}/>
                    <NextButton routeNext={routeNext}/>
                </RightSideBar>
            </div>
            <Footer/>
        </div>
    )
}
