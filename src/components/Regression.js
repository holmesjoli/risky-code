import { LogisticRegression } from  './JsRegression'; 
import laundry from "../data/processed/laundry.json";

function runModel(items, setItems) {

    var logistic = new LogisticRegression({
        alpha: 0.001,
        iterations: 1000,
        lambda: 0.0
    });

    var trainingData = [];
    var testingData = [];

    for(let i of laundry) {
        var row = [];
        // row.push(i.pastel ? 1: 0); // pastel;
        // row.push(i.print ? 1: 0); // print;
        // row.push(i.soiled ? 1: 0); // soiled;
        row.push(i.white ? 1: 0); // white;
        row.push(i.hotWaterLoad ? 1: 0); // output which is 1 if hot water load
        trainingData.push(row);
    }

    for(let i of items) {
        var row = [];
        // row.push(i.pastel ? 1: 0); // pastel;
        // row.push(i.print ? 1: 0); // print;
        // row.push(i.soiled ? 1: 0); // soiled;
        row.push(i.white ? 1: 0); // white;
        row.push(i.column === "Hot water load" ? 1: 0); // output which is 1 if hot water load
        testingData.push(row);
    }

    // === Train the logistic regression === //
    var model = logistic.fit(trainingData);

    var threshold = .6;
    // // // === Print the trained model === //

    // // // === Testing the trained logistic regression === //
    for(var i=0; i < testingData.length; ++i){
        var p = logistic.transform(testingData[i]);
        var predicted = p >= model.threshold ? 1 : 0;
        // console.log("linear classifier binary classifier testing: actual: " + testingData[i][4] + " predicted: " + predicted);
        items[i].predictedCorrectly = testingData[i][4] === predicted;
        items[i].predicted = p;
    }

    setItems(items)
}

export default function Regression({items, setItems, modelVariableSelected}) {


    runModel(items, setItems)

    // if (modelVariableSelected) {
    // console.log(items)
    // }
}