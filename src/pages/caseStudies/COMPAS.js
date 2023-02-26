import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Terminology from '../../components/Terminology';
import Progress from "../../components/Progress";
import { BackButton, NextButton } from '../../components/Button';
import { LeftSideBar, RightSideBar } from "../../components/Sidebar";
import { Consequence, Stakeholders } from "../../components/PolicyScenario";
import { Slider, MenuItem, FormControl, Select } from '@material-ui/core' ;
import * as d3 from 'd3';
import data from "../../data/processed/compas.json";

let chartIdBlack = "COMPAS-Chart-Black"
let chartIdWhite = "COMPAS-Chart-White"
let width = 570;
let height = 275;
let style = "darkMode";

function initGraph(data) {
    d3.select(`#${chartIdBlack}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.select(`#${chartIdWhite}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    console.log(data)

    renderGraph(data);
}

function renderGraph(data) {

}

export function Content() {

    const [predictiveProbability, setPredictiveProbability] = useState(40);
    const [definition, setDefinition] = useState("fpr");

    const updateSlider = (event, value) => {
        setPredictiveProbability(value/10)
    }

    const updateDefinition = (event) => {
        setDefinition(event.target.value)
    }

    useEffect(() => {
        initGraph(data);
    }, []);

    useEffect(() => {
        renderGraph(data);
    }, [predictiveProbability]);

    return(
        <div className="Content">
            <div className="Three-Column3">
                <div>
                    <div className="Container Margin-Bottom">
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
                            onChange={updateSlider}
                            />
                    </div>
                    <div className="Container">
                        <FormControl variant="outlined" size="small">
                            <Select
                                value="fpr"
                                onChange={updateDefinition}
                            >
                                <MenuItem value="fpr">False Positive Rate</MenuItem>
                                <MenuItem value="fnr">False Negative Rate</MenuItem>
                                <MenuItem value="calibration">Calibration Rate</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div>
                    <div className="Container">
                        <h3>the compas algorithm's recidivism predictions</h3>
                        <div>
                            <h4>black</h4>
                            <div id={chartIdBlack} className="Margin-Bottom Bottom-Rule"></div>
                        </div>
                        <div>
                            <h4 className="Margin-Top">white</h4>
                            <div id={chartIdWhite}></div>
                        </div>
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
                    <Consequence/>
                    <NextButton routeNext={routeNext}/>
                </RightSideBar>
            </div>
            <Footer/>
        </div>
    )
}
