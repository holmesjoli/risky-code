// import { useEffect } from 'react';
import { TextField } from "@material-ui/core";
// import * as d3 from 'd3';
// import { visStyles } from "../utils/global";

// let chartId = "brainstorm-terms";
// let width = 400;
// let height = 200;
// let style = "darkMode";
// const algoTerms = [{"term": "automated"},
//                     {"term": "rule"},
//                     {"term": "objective"}, 
//                     {"term": "subjective"}, 
//                     {"term": "neutral"}, 
//                     {"term": "unbiased"},
//                     {"term": "biased"}, 
//                     {"term": "instructions"}, 
//                     {"term": "program"}, 
//                     {"term": "machine learning"}, 
//                     {"term": "artificial intelligence (AI)"}, 
//                     {"term": "step"}, 
//                     {"term": "calculation"}, 
//                     {"term": "task"}, 
//                     {"term": "function"},
//                     {"term": "code"},
//                     {"term": "manual"},
//                     {"term": "analog"},
//                     {"term": "process"},
//                     {"term": "procedure"},
//                     {"term": "mathematics"},
//                     {"term": "system"}];

// function transitionHighlightBack() {
//     d3.selectAll(".brainstorm-term")
//     .transition()
//     .ease(d3.easePoly)
//     // .delay((d, i) => i*2000)
//     .duration(1000)
//     .delay(function(d, i){return(i*1000 + 1000)})
//     // .duration((d, i) => i*1000)
//     .attr("fill", visStyles[style]["textColor"])
//     .attr("font-weight", 400)
//     .on('end', transitionHighlight);
// }

// function transitionHighlight() {
//     d3.selectAll(".brainstorm-term")
//     .transition()
//     .ease(d3.easePoly)
//     .duration(1000)
//     .delay(function(d, i) {return(i*1000 + 2000)})
//     .attr("fill", visStyles[style]["textHighlightColor"])
//     .attr("font-weight", 500)
//     .on('end', transitionHighlightBack);
// }

// function initNetwork() {
//     let svg = d3.select(`#${chartId}`)
//         .append("svg")
//         .attr("width", width)
//         .attr("height", height);

//     let simulation = d3.forceSimulation()
//         .force("center", d3.forceCenter(width / 2, height / 2))
//         .force("collision", d3.forceCollide().strength(5.5).radius(20))
//         .force('x', d3.forceX().x(function (d) {
//         return width/2;
//         }).strength(.03))
//         .force('y', d3.forceY().y(function (d) {
//         return height/2;
//         }).strength(.03))
//         .on("tick", ticked);

//     let text = svg.append("g")
//         .selectAll("text");

//     text = svg
//         .selectAll("text")
//         .data(algoTerms, d => d.term)
//         .join(
//             enter  => enter.append("text")
//                 .attr("fill", visStyles[style]["textColor"])
//                 .attr("font-size", visStyles[style]["fontSize"])
//                 .attr("font-weight", 400)
//                 .attr("cursor", "default")
//                 .attr("letter-spacing", ".6px")
//                 .attr("class", "brainstorm-term")
//                 .text(d => d.term)
//     );

//     function ticked() {
//         text
//         .attr("x", function (d) { return d.x + 10; })
//         .attr("y", function (d) { return d.y - 10; });
//     }

//     simulation.nodes(algoTerms);
//     simulation.alpha(1).restart();
// }

export function AlgorithmDefinition({algorithmDefinition, setAlgorithmDefinition}) {

    const updateAlgorithmDefinition = (event) => {
        setAlgorithmDefinition(event.target.value)
    }

    return(
        <div className="No-Margin-Bottom">
            <TextField placeholder="add your definition here" variant="outlined" multiline={true} minRows={4} defaultValue={algorithmDefinition} onChange={updateAlgorithmDefinition}/>
        </div>
    )
}

export function BrainstormAlgorithm({algorithmDefinition, setAlgorithmDefinition}) {

    // useEffect(() => {
    //     initNetwork();
    // }, []);

    return(
        <div className="Container Margin-Bottom">
            <h4>how do you define the term <span className="Emphasis">algorithm</span>?</h4>
            <AlgorithmDefinition algorithmDefinition={algorithmDefinition} setAlgorithmDefinition={setAlgorithmDefinition}/>
        </div>
    )
}

export function BrainstormLaundryRules({rules, setRules}) {

    return(
        <div className="Container Margin-Bottom">
            <h4 className="Small-Margin">define</h4>
            <p>This project defines an algorithm as <span className="Emphasis">a series of steps that allow you to perform a particular task</span>.</p>
            <h4 className="Small-Margin">analogize</h4>
            <p>The analogy used in this module is <span className="Emphasis">laundry</span>. What are some rules you use to sort laundry for a <span className="Emphasis">cold water load?</span></p>
            <LaundryRules rules={rules} setRules={setRules}/>
        </div>
    )
}

export function LaundryRules({rules, setRules}) {

    const updateRule1 = (event) => {
        rules.rule1 = event.target.value;
        setRules(rules);
    }

    const updateRule2 = (event) => {
        rules.rule2 = event.target.value;
        setRules(rules);
    }

    const updateRule3 = (event) => {
        rules.rule3 = event.target.value;
        setRules(rules);
    }

    // defaultValue={rules.rule2}

    return(
        <div>
            <div className="Margin-Bottom">
                <TextField placeholder="add laundry rule" variant="outlined" onChange={updateRule1}/>
            </div>
            <div className="Margin-Bottom">
                <TextField placeholder="add laundry rule" variant="outlined" onChange={updateRule2}/>
            </div>
            <div className="No-Margin-Bottom">
                <TextField placeholder="add laundry rule" variant="outlined" onChange={updateRule3}/>
            </div>
        </div>
    )
}
