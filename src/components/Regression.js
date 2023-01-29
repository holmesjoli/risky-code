import { LogisticRegression } from  './JsRegression';
// var jsregression = require('js-regression');
 
import iris from "../data/processed/iris.json"

function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

export default function Regression() {
    var logistic = new LogisticRegression({
        alpha: 0.001,
        iterations: 1000,
        lambda: 0.0
    });
 
    var trainingDataSize = Math.round(iris.length * 0.8);
    var trainingData = [];
    var testingData = [];

    var ids = iris.map((d) => d.Id);

    let randomIds = getRandomSubarray(ids, trainingDataSize)
    // let trainingData = iris.filter((d) => randomIds.includes(d.Id))
    // let testingData = iris.filter((d) => !randomIds.includes(d.Id))

    // console.log(iris)

    for(let i of iris) {
        var row = [];
        row.push(+i.SepalLengthCm); // sepalLength;
        row.push(+i.SepalWidthCm); // sepalWidth;
        row.push(+i.PetalLengthCm); // petalLength;
        row.push(+i.PetalWidthCm); // petalWidth;
        row.push(i.Species === "Iris-virginica"? 1: 0); // output which is 1 if species is Iris-virginica; 0 otherwise
        if(randomIds.includes(i.Id) ) {
            trainingData.push(row);
        } else {
            testingData.push(row);
        }
    }

    // // === Train the logistic regression === //
    var model = logistic.fit(trainingData);

    console.log(logistic.threshold)
    // // === Print the trained model === //
    console.log(model);

    // // === Testing the trained logistic regression === //
    for(var i=0; i < testingData.length; ++i){
        var p = logistic.transform(testingData[i]);
        var predicted = p >= logistic.threshold ? 1 : 0;
        console.log("linear classifier binary classifier testing: actual: " + testingData[i][4] + " predicted: " + predicted);
    }

}