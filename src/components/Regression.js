import { LogisticRegression } from  './JsRegression'; 
import laundry from "../data/processed/laundry.json";
import { getModelVariables } from "../utils/global";
import { useEffect } from 'react';
import * as d3 from 'd3';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import LaundryItem from '../assets/images/laundry/svg/Asset 25.svg';

var logistic = new LogisticRegression({
    alpha: 0.001,
    iterations: 1000,
    lambda: 0.0
});

export function Accuracy({items, variables}) {

    const modelVars = getModelVariables(variables);
    const pred = items.filter(d => d.predictedCorrectly).length
    const pct = Math.round((pred/items.length)*100)

    useEffect(() => {

        if (modelVars.length > 0 ) {
            d3.selectAll(".Accuracy-Percent")
                .text(`${pct}%`)

            d3.selectAll(".Accuracy")
                .attr("class", "Accuracy Container Visible")
        } else {
            d3.selectAll(".Accuracy-Percent")
                .text("")

            d3.select(".Accuracy")
                .attr("class", "Accuracy Container Hidden")
        }
    }, [items, variables])

    return(
        <div className="Accuracy Container Hidden">
            <div className="Overlay-Controls">
                <h3 className="Small-Margin">model accuracy</h3>
                <InfoOutlinedIcon/>
            </div>
            <div className="Accuracy-Percent Small-Margin"></div>
        </div>
    )
}

export function PredictiveOutcomes() {

    return(
        <div className="Container Margin-Bottom">
            <h3>predictive probability</h3>
            <div className="Row">
                <div className="Card-Flat Example-Card">
                    <img src={LaundryItem} alt="Dirty laundry item" />
                    <div>.68</div>
                </div>
                <p className="Margin-Left">This shirt has a 68% probability of belonging in the hot water load.</p>
            </div>
        </div>
    )
}

function logisticData(iterateData, modelVars) {

    var data = [];

    for(let i of iterateData) {
        var row = [];

        if (modelVars.includes("cleanType")) {
            row.push(i.cleanType === "Machine wash cold"? 1: 0)
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

        if (i.hotWaterLoad === undefined) {
            row.push(i.column === "Hot water load" ? 1: 0)
        } else {
            row.push(i.hotWaterLoad ? 1: 0)
        }

        row.push(i.hotWaterLoad ? 1: 0)

        data.push(row);
    }

    return data;
}

export function Regression({items, setItems, variables}) {

    var modelVars = getModelVariables(variables);

    useEffect(() => {

        if (modelVars.length > 0) {

            var trainingData = logisticData(laundry, modelVars);
            var testingData = logisticData(items, modelVars);

            // === Train the logistic regression === //
            var model = logistic.fit(trainingData);
            var threshold = .6;

            // // // === Testing the trained logistic regression === //
            for(var i=0; i < testingData.length; ++i){
                var pp = logistic.transform(testingData[i]);
                var predicted = pp >= model.threshold? 1: 0;

                items[i].predicted = predicted;
                items[i].predictedProbability = pp;
                items[i].actual = items[i].column === "Hot water load"? 1: 0;
                items[i].predictedCorrectly = items[i].actual === items[i].predicted;
            }

            items.sort((a, b) => b.predicted - a.predicted);

            setItems(items)
        }
    }, [items, variables])
}