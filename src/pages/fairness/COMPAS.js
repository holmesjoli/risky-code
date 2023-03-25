import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import * as d3 from 'd3';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Overlay from "../../components/Overlay";
import { terms } from '../../utils/global';
import Progress from "../../components/Progress";
import { BackButton, NextButton, NextButtonOverlay } from '../../components/Button';
import { LeftSideBar, RightSideBar, Description, Terminology, Term } from "../../components/Sidebar";
import { RoleShort } from "../../components/Role";
import Timer from "../../components/Timer";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';
import { BaseRates } from "../../components/Brainstorm";
import data from "../../data/processed/baseRates.json";
import { visStyles } from "../../utils/global";

let chartId = "Base-Rates-Chart";
let legendId = "Base-Rates-Legend";
let width = 600;
let height = 480;
let margin = {left: 10, right: 10, top: 10, bottom: 10}
let style = "darkMode";

const fillData = [{"fill": "Black", "pop": "Black"},
                  {"fill": "White", "pop": "White"},
                  {"fill": "Other", "pop": "Other"}]

const opacityData = [{"opacity": 1, "text": "Excess"},
                    {"opacity": .35, "text": "blah"}]

const xScale = d3.scaleLinear()
    .domain([0, width])
    .range([margin.left, width-margin.right]);

const yScale = d3.scaleLinear()
    .domain([height, 0])
    .range([height-margin.bottom, margin.top]);

export const fillScale = d3.scaleOrdinal()
    .domain(["White", "Black", "Other"])
    .range(["#ea21ad", "#FD7B03", "#F3C010"]);

export function symbolScale(d) {

    if(d === "White") {
        return d3.symbolCircle;
    } else if (d === "Black") {
        return d3.symbolTriangle;
    } else {
        return d3.symbolSquare;
    }
}

export function transform(d) {
    return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")";
}

function grid(data) {

    const cols = 100;
    const colW = width / cols;
    const rows = Math.round(data.length/cols)
    const rowH = height / rows;

    for (let i = 0; i < data.length; i++) {

        let col = i % cols;
        let row = Math.floor(i / cols);
        data[i].x = (colW * col)
        data[i].y = (rowH * row)

    }

    return data;
}

function renderTooltip(baseRate) {
    var tooltip = d3.select(`#${chartId} .tooltip`);

    d3.selectAll(".compas-base-rate-point")
        .on("mouseover", function (e, d) {

        var otherPop = d.pop === "Other" ? "person of another race": `${d.pop} person`;
        var otherArrests =  d.arrests === "Other"? "person of another race": `${d.arrests} person`;

        var proportionate = d.pop === d.arrests ? `1 ${otherArrests}`: `1 ${otherArrests} who would be a ${otherPop} if the data were proportionate to the population of Broward County, Florida`
        var text = baseRate === "pop"? `1 ${otherPop}`: proportionate;

        let thisCircle = d3.select(this);
        var x = d.x + 20;
        var y = d.y - 10;

        thisCircle
            .attr("stroke-width", 2)
            .attr("stroke", visStyles[style]["secondaryHighlightColor"]);

        tooltip.style("visibility", "visible")
            .style("left", x + "px")
            .style("top", y + "px")
            .html(text);

    }).on("mouseout", function () {
        tooltip.style("visibility", "hidden");

        d3.selectAll(".compas-base-rate-point")
            .attr("stroke", "none");
    });
}

function initGraph(data, baseRate) {
    d3.select(`#${chartId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.select(`#${chartId}`)
        .append("div")
        .attr("class", "tooltip");

    renderGraph(data, baseRate);
}

function renderGraph(data, baseRate) {

    let svg = d3.select(`#${chartId} svg`);

    data = grid(data);

    svg
        .selectAll("path")
        .data(data, d => d.id)
        .join(
            enter  => enter
            .append("path")
                .attr("d", d3.symbol()
                    .type(((d) => symbolScale(d[baseRate])))
                    .size(8))
                .attr("transform", transform)
                .attr("fill", d => fillScale(d[baseRate]))
                .attr("class", "compas-base-rate-point"),
            update => update
                .attr("opacity", d => d.pop === d.arrests && baseRate === "arrests" ? .35: 1)
                .attr("fill", d => fillScale(d[baseRate]))
                .attr("d", d3.symbol()
                    .type(((d) => symbolScale(d[baseRate])))
                    .size(8))
        );

    renderTooltip(baseRate);
}

function initLegend(baseRate) {

    let height = 40;

    d3.select(`#${legendId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    drawLegend(baseRate);
}

function drawLegend(baseRate) {

    let svg = d3.select(`#${legendId} svg`)
    let h = 40;

    let shape = svg.append("g")
        .selectAll("path")
            .data(fillData, d => d.pop)
            .enter()
            .append("g")
        .attr("transform", (d, i) => `translate(${(i * 70) + 30}, ${h / 3})`)

    shape.append("path")
        .attr("d", d3.symbol()
            .type(((d) => symbolScale(d[baseRate])))
            .size(100))
        .attr("fill", d => fillScale(d.fill))
        .attr("opacity", baseRate === "arrests" ? .35: 1)
        ;

    // Add a text element to the previously added g element.
    shape.append("text")
        .attr("text-anchor", "middle")
        .attr("y", 20)
        .attr("fill", visStyles[style]["textColor"])
        .attr("font-size", visStyles[style]["fontSize"])
        .text(d => d.pop)
        .attr("fill", visStyles[style]["textHighlightColor"])
        .attr("font-size", 12)
        .attr("letter-spacing", visStyles[style]["letterSpacing"]);

    let color = svg.append("g")
        .selectAll("circle")
        .data(opacityData, d => d.opacity)
        .enter()
        .append("g")
        .attr("transform", (d, i) => `translate(${(i * 70) + 300}, ${h / 3})`)

    color.append("circle")
        .attr("r", 6)
        .attr("fill", visStyles[style]["textColor"])
        .attr("opacity", d => baseRate === "pop"? 0: d.opacity);

    color.append("text")
        .attr("text-anchor", "middle")
        .attr("y", 25)
        .attr("fill", visStyles[style]["textHighlightColor"])
        .attr("font-size", visStyles[style]["fontSize"])
        .attr("opacity", baseRate === "pop"? 0: 1)
        .text(d => d.text)
        .attr("fill", visStyles[style]["textHighlightColor"])
        .attr("font-size", 12)
        .attr("letter-spacing", visStyles[style]["letterSpacing"]);
}

function Model() {
    return(
        <div className="Container2 Model">
            <p>Research showed that the COMPAS recidivism algorithm used a <a href="https://www.documentcloud.org/documents/2702103-Sample-Risk-Assessment-COMPAS-CORE.html#document/p4/a296597" target="_blank">137 variables</a> in their statistical model. Example variables are shown below. Hover over the variables for a longer variable definition.</p>
            <div className="Text-Align-Center">
                <div className="Bottom-Rule Margin-Bottom">
                    <h4 className="Text-Align-Left">model variables</h4>
                    <Tooltip title="Frequency of moving homes in the last twelve months">
                        <div className="Variable-Flat">moved frequently</div>
                    </Tooltip>
                    <Tooltip title="Suspected or admitted gang membership or affiliation with gang members">
                        <div className="Variable-Flat">gang membership</div>
                    </Tooltip>
                    <Tooltip title="Farents separateed">
                        <div className="Variable-Flat">parents separated</div>
                    </Tooltip>
                    <Tooltip title="Father, mother, sister, brother, or friend ever arrested and was your father or mother ever arrested">
                        <div className="Variable-Flat">family and friend incarceration</div>
                    </Tooltip>
                    <Tooltip title="Parent or parential figure drug or alcohol problem">
                        <div className="Variable-Flat">family member substance abuse</div>
                    </Tooltip>
                    <Tooltip title="Completion of a high school education or GED">
                        <div className="Variable-Flat">high school education/ged</div>
                    </Tooltip>
                    <Tooltip title="Employment">
                        <div className="Variable-Flat">current employment</div>
                    </Tooltip>
                    <Tooltip title="Age of first arrest">
                        <div className="Variable-Flat">age of first arrest</div>
                    </Tooltip>
                </div>
            <ExpandMoreIcon className="Scale200"/>
            <div className="Margin-Bottom">
                <h4 className="Text-Align-Left">outcome variable</h4>
                <Tooltip title="Age of first arrest">
                    <div className="Variable-Flat">arrested and charged</div>
                </Tooltip>
            </div>
        </div>
    </div>
    )
}

export function Content({baseRatesBrainstorm, setBaseRatesBrainstorm, user, disableFairnessNext, setDisableFairnessNext, baseRate, setBaseRate}) {
    
    const handleChange = event => {
        let rate = event.target.checked? "arrests": "pop";
        setBaseRate(rate);
    }

    const explanation = baseRate === "pop"? <h6 className="Small-Margin-Top">Visualization shows the <span className="Emphasis">arrested and charged</span> population if it were proportionate to the racial demographics of Broward County, Florida.</h6>: <h6 className="Small-Margin-Top">Visualization highlights Black people and people of other races are over represented in Broward County, Florida's <span className="Emphasis">arrested and charged</span> population. Conversely, the visualization also shows where White people are under represented.</h6>;
    
    return(
        <div className="Content No-Padding-Top">
            <div>
                {/* <h3>explore</h3> */}
                <div className="One-Column-Three4">
                    <div className="Container Margin-Bottom">
                        <h4 className="No-Margin-Bottom">visualize</h4>
                        <div id={chartId} className="chart"></div>
                        <h4>legend</h4>
                        <div id={legendId} className="Small-Margin-Bottom"></div>
                        {explanation}
                    </div>
                    <div>
                        <div className="Container Margin-Bottom">
                            <h4 className="Small-Margin">learn</h4>
                            <p> The data used to train COMPAS is from Broward County, Florida. There are 7214 people represented in the data, each visualized as a single dot. The prevalence of <span className="Emphasis">new charges</span> is higher for Black defendants compared to White defendants. However, this should <span className="Semi-Bold">not</span> be interpreted to mean that the prevalence of <span className="Emphasis">new crimes</span> is higher for Black defendants compared to White defendants.</p>
                            <p className="No-Margin-Bottom">Prevalence of a certain demographic (e.g., race) in an underlying population (e.g. new charges) is called a <span className="Emphasis">base rate</span>.</p>
                        </div>
                        <div className="Container Margin-Bottom">
                            <h4 className="Small-Margin">reveal discrepancies</h4>
                            <Switch size="small" color="secondary" onChange={handleChange}/>
                        </div>
                        <BaseRates baseRatesBrainstorm={baseRatesBrainstorm} setBaseRatesBrainstorm={setBaseRatesBrainstorm}>
                            <p>Brainstorm why there are discrepancies between the base rates in they underlying population (new charges).</p>
                        </BaseRates>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Outcomes({}) {
    return(

        <div className="Container2 Model">
            <div className="Text-Align-Center">
                <div className="Bottom-Rule Margin-Bottom">
                    <h4 className="Text-Align-Left">model variable</h4>
                    <Tooltip title="Frequency of moving homes in the last twelve months">
                        <div className="Variable-Flat">moved frequently</div>
                    </Tooltip>
                </div>
                <div className="Margin-Bottom">
                    <h4 className="Text-Align-Left">proxy variable</h4>
                    <Tooltip title="Frequency of moving homes in the last twelve months">
                        <div className="Variable-Flat">arrests</div>
                    </Tooltip>
                </div>
        </div>
    </div>
    )
}

export default function COMPAS({config, user, disableFairnessNext, setDisableFairnessNext, baseRatesBrainstorm, setBaseRatesBrainstorm, modules}) {

    const [isOpen, setIsOpen] = useState(true);
    const [baseRate, setBaseRate] = useState("pop");
    const [id, setId] = useState("fairness");

    let navigate = useNavigate();
    const routeNext = () => {
      let path = `/Calibration`; 
      navigate(path);
    }

    const routeBack = () => {
      let path = `/Fairness`; 
      navigate(path);
    }

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        initGraph(data, baseRate);
        initLegend(baseRate);
    }, []);

    useEffect(() => {
        renderGraph(data, baseRate);
    }, [baseRate]);

    useEffect(() => {
        setId(isOpen ? "fairness": config.id);
    }, [isOpen]);

    return (
        <div className="App">{
            isOpen ?
            <Overlay isOpen={isOpen} onClose={toggleOverlay}>
            <div className="Containers-Container">
                <div className="Container-Fill-Secondary No-Padding-Right">
                <h3 className="Page-Title">introduction to compas' data</h3>
                    <div className="Two-Column-Three">
                        <Model/>
                        <RightSideBar>
                            <div className="Container2 Margin-Bottom">
                                <h4 className="Small-Margin">learn</h4>
                                <p>Before we jump into algorithmic fairness its important to know a little bit more about the COMPAS algorithm and its data.</p>
                                <p className="No-Margin-Bottom">The outcome variable of interest is the <span className="Emphasis">reoffense</span> in the COMPAS model. However, the data used to train COMPAS only reports whether a defendant was charged with another crime, <span className="Emphasis">arrests</span>. In predictive modeling, <span className="Emphasis">arrests</span>. is called a proxy variable for the actual outcome variable of interest, <span className="Emphasis">reoffense</span>.</p>
                            </div>
                            <Timer user={user} disableNext={disableFairnessNext} setDisableNext={setDisableFairnessNext}>
                                <p>Does everyone who commits a crime get charged with that crime?</p>
                                <p>What are some factors that affect the likelihood that someone who commits a crime will be arrested and charged?</p>
                                <p className="No-Margin-Bottom">Do you think that <span className="Emphasis">arrests</span> is a good proxy variable for <span className="Emphasis">reoffense</span>?</p>
                            </Timer>
                            {toggleOverlay? <NextButtonOverlay disabled={disableFairnessNext} className="DarkOrange" toggleOverlay={toggleOverlay}/>: <></>}
                        </RightSideBar>
                    </div>
                </div>
            </div>
        </Overlay>:
        <></>
        }
        <Header/>
        <div className="Main">
            <LeftSideBar>
                <Description title={config.title}>
                    <p>Use the toggle switch to reveal discrepancies in the base rate of the population.</p>
                </Description>
                <RoleShort moduleName="fairness"/>
                <Terminology margin="Margin-Large-Bottom" className="DarkOrange">
                    <Term term={terms['population-base-rate']}/>
                    <Term term={terms['proxy-variable']}/>
                    <Term term={terms['recidivism']}/>
                </Terminology>
                <BackButton routeBack={routeBack}/>
            </LeftSideBar>
            <Content baseRatesBrainstorm={baseRatesBrainstorm} setBaseRatesBrainstorm={setBaseRatesBrainstorm} user={user} disableFairnessNext={disableFairnessNext} setDisableFairnessNext={ setDisableFairnessNext} baseRate={baseRate} setBaseRate={setBaseRate}/>
            <RightSideBar>
                <Progress id={id} modules={modules} className="DarkOrange"/>
                <NextButton routeNext={routeNext} className="DarkOrange"/>
            </RightSideBar>
        </div>
        <Footer/>
    </div>
    )
}
