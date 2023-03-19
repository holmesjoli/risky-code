import { LogisticRegression } from  './JsRegression'; 
import { getModelVariables } from "../utils/global";
import { useEffect } from 'react';
import * as d3 from 'd3';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import LaundryItem from '../assets/images/laundry/svg/Asset 25.svg';
import { Slider } from '@material-ui/core';

var logistic = new LogisticRegression({
    alpha: 0.001,
    iterations: 1000,
    lambda: 0.0
});

export function Threshold({predictiveProbability, updateSlider}) {
    return(
        <div className="Container Margin-Bottom Padding-Bottom Bottom-Rule">
            <h4 className="Small-Margin">decision threshold</h4>
            <p className="Small-Margin">Laundry items with a predictive probability above {predictiveProbability}% are classified as belonging to the cold water load.</p>
            <Slider
                size="small"
                defaultValue={predictiveProbability}
                min={10}
                max={100}
                step={5}
                aria-label="Small"
                valueLabelDisplay="auto"
                onChange={updateSlider}
            />
        </div>
    )
}

export function Accuracy({items, variables, predictiveProbability}) {

    const modelVars = getModelVariables(variables);
    const pred = items.filter(d => d.predictedCorrectly).length
    const pct = Math.round((pred/items.length)*100)

    useEffect(() => {

        if (modelVars.length > 0 ) {
            d3.selectAll(".Accuracy-Percent")
                .text(`${pct}%`)

            d3.selectAll(".Accuracy")
                .attr("class", "Accuracy Visible")
        } else {
            d3.selectAll(".Accuracy-Percent")
                .text("")

            d3.select(".Accuracy")
                .attr("class", "Accuracy Hidden")
        }
    }, [items, variables, predictiveProbability])

    return(
        <div className="Accuracy Hidden">
            <div className="Container">
                <h4 className="Small-Margin">model accuracy</h4>
                <p>Accuracy is a percent of how many predicted values match the actual values.</p>
                <h5 className="Accuracy-Percent Small-Margin No-Margin-Top Semi-Bold White Opacity1"></h5>
            </div>
        </div>
    )
}

export function PredictiveOutcomes({predictiveProbability=.5}) {

    useEffect(() => {

        d3.selectAll(".Example-Card")
            .attr("class", predictiveProbability < 28? "Card-Flat Example-Card": "Card-Flat Example-Card Predicted-False");

            console.log(predictiveProbability)

    }, [ predictiveProbability])

    return(
        <div className="Margin-Bottom">
            <div className="Container">
                <h4 className="Small-Margin">predictive probability</h4>
                <div className="Row">
                    <div className="Card-Flat Example-Card">
                        <img src={LaundryItem} alt="Dirty laundry item" />
                        <h5 className="Semi-Bold White Opacity1">0.28</h5>
                    </div>
                    <div>
                        <p>This shirt, classified as a <span className="Semi-Bold White Opacity1">save for later load</span> item, has a <span className="Semi-Bold White Opacity1">28%</span> probability of belonging in the cold water load.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function logisticData(iterateData, modelVars) {

    var data = [];

    for(let i of iterateData) {
        var row = [];

        if (modelVars.includes("dryCleanOnly")) {
            row.push(i.dryCleanOnly ? 1: 0)
        }

        if (modelVars.includes("pastel")) {
            row.push(i.pastel ? 1: 0)
        }

        if (modelVars.includes("print")) {
            row.push(i.print ? 1: 0)
        }

        if (modelVars.includes("delicate")) {
            row.push(i.delicate ? 1: 0)
        }

        if (modelVars.includes("white")) {
            row.push(i.white ? 1: 0)
        }

        if (i.coldWaterLoad === undefined) {
            row.push(i.column === "cold water load" ? 1: 0)
        } else {
            row.push(i.coldWaterLoad ? 1: 0)
        }

        row.push(i.coldWaterLoad ? 1: 0)

        data.push(row);
    }

    return data;
}

export function Regression({items, setItems, variables, predictiveProbability}) {

    var modelVars = getModelVariables(variables);

    useEffect(() => {

        if (modelVars.length > 0) {

            var testingData = logisticData(items, modelVars);

            // === Train the logistic regression === //
            var model = logistic.fit(testingData);

            // // // === Testing the trained logistic regression === //
            for(var i=0; i < testingData.length; ++i){
                var pp = logistic.transform(testingData[i]);
                var predicted = pp >= predictiveProbability? 1: 0;

                items[i].predicted = predicted;
                items[i].predictedProbability = pp;
                items[i].actual = items[i].column === "cold water load"? 1: 0;
                items[i].predictedCorrectly = items[i].actual === items[i].predicted;
            }

            items.sort((a, b) => b.predicted - a.predicted);
            setItems(items)
        }
    }, [items, variables, predictiveProbability])
}
