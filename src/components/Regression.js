import { LogisticRegression } from  './JsRegression'; 
import laundry from "../data/processed/laundry.json";
import { getModelVariables } from "../utils/global";
import { useEffect } from 'react';

var logistic = new LogisticRegression({
    alpha: 0.001,
    iterations: 1000,
    lambda: 0.0
});

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

        if (modelVars.includes("soiled")) {
            row.push(i.soiled ? 1: 0)
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

export default function Regression({items, setItems, variables}) {

    var modelVars = getModelVariables(variables);

    useEffect(() => {

        if (modelVars.length > 0) {

            var trainingData = logisticData(laundry, modelVars);
            var testingData = logisticData(items, modelVars);

            // === Train the logistic regression === //
            var model = logistic.fit(trainingData);
            var threshold = .6;
        
            // var itemsUpdated = items;
            var itemsUpdated = Object.assign([], items);

            // // // === Testing the trained logistic regression === //

            console.log(model.threshold)
            for(var i=0; i < testingData.length; ++i){
                var pp = logistic.transform(testingData[i]);
                var predicted = pp >= model.threshold? 1: 0;
    
                itemsUpdated[i].predicted = predicted;
                itemsUpdated[i].predictedProbability = pp;
                itemsUpdated[i].actual = itemsUpdated[i].column === "Hot water load"? 1: 0;
                itemsUpdated[i].predictedCorrectly = itemsUpdated[i].actual === itemsUpdated[i].predicted;
            }

            itemsUpdated.sort((a, b) => b.predicted - a.predicted);

            setItems(items)
        }
    }, [items, variables])
}