// import * as tf from '@tensorflow/tfjs';
// import * as tfvis from '@tensorflow/tfjs-vis';
// import { mode } from 'd3-array';
// import data from "../data/processed/diabetes.json"
import { PythonProvider } from 'react-py';
import { useState } from 'react';
import { usePython } from 'react-py';

function Codeblock() {
    const [input, setInput] = useState('')
  
    // Use the usePython hook to run code and access both stdout and stderr
    const { runPython, stdout, stderr, isLoading, isRunning } = usePython()
  
    return (
      <>
        {isLoading ? <p>Loading...</p> : <p>Ready!</p>}
        <form>
          <textarea
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your code here"
          />
          <input
            type="submit"
            value={!isRunning ? 'Run' : 'Running...'}
            disabled={isLoading || isRunning}
            onClick={(e) => {
              e.preventDefault()
              runPython(input)
            }}
          />
        </form>
        <p>Output</p>
        <pre>
          <code>{stdout}</code>
        </pre>
        <p>Error</p>
        <pre>
          <code>{stderr}</code>
        </pre>
      </>
    )
  }

// const oneHot = outcome => Array.from(tf.oneHot(outcome, 2).dataSync());

// const createDataSets = (data, features, testSize, batchSize) => {

//     const X = data.map(r =>
//         features.map(f => {
//           const val = r[f]
//           return val === undefined ? 0 : val
//         })
//     )

//     const y = data.map(r => {
//         const outcome = r.Outcome === undefined ? 0 : r.Outcome
//         return oneHot(outcome)
//     })

//     const splitIdx = parseInt((1 - testSize) * data.length, 10);

//     const ds = tf.data
//         .zip({ xs: tf.data.array(X), ys: tf.data.array(y) })
//         .shuffle(data.length, 42);

//     return [
//         ds.take(splitIdx).batch(batchSize),
//         ds.skip(splitIdx + 1).batch(batchSize),
//         tf.tensor(X.slice(splitIdx)),
//         tf.tensor(y.slice(splitIdx))
//     ];

// };

// const trainLogisticRegression = async (featureCount, trainDs, validDs) => {
//     const model = tf.sequential();
//     model.add(
//       tf.layers.dense({
//         units: 2,
//         activation: "softmax",
//         inputShape: [featureCount]
//       })
//     );
//     const optimizer = tf.train.adam(0.001);
//     model.compile({
//       optimizer: optimizer,
//       loss: "binaryCrossentropy",
//       metrics: ["accuracy"]
//     });
//     const trainLogs = [];
//     const lossContainer = document.getElementById("loss-cont");
//     const accContainer = document.getElementById("acc-cont");
//     // console.log("Training...");
//     await model.fitDataset(trainDs, {
//       epochs: 100,
//       validationData: validDs,
//     //   callbacks: {
//     //     onEpochEnd: async (epoch, logs) => {
//     //       trainLogs.push(logs);
//     // //       tfvis.show.history(lossContainer, trainLogs, ["loss", "val_loss"]);
//     // //       tfvis.show.history(accContainer, trainLogs, ["acc", "val_acc"]);
//     //     }
//     //   }
//     });
  
//     return model;
// };

// const trainComplexModel = async (featureCount, trainDs, validDs) => {
//     const model = tf.sequential();
//     model.add(
//       tf.layers.dense({
//         units: 12,
//         activation: "relu",
//         inputShape: [featureCount]
//       })
//     );
//     model.add(
//       tf.layers.dense({
//         units: 2,
//         activation: "softmax"
//       })
//     );
//     const optimizer = tf.train.adam(0.0001);
//     model.compile({
//       optimizer: optimizer,
//       loss: "binaryCrossentropy",
//       metrics: ["accuracy"]
//     });
//     const trainLogs = [];
//     const lossContainer = document.getElementById("loss-cont");
//     const accContainer = document.getElementById("acc-cont");
//     // console.log("Training...");
//     await model.fitDataset(trainDs, {
//       epochs: 100,
//       validationData: validDs,
//     //   callbacks: {
//     //     onEpochEnd: async (epoch, logs) => {
//     //       trainLogs.push(logs);
//     //       tfvis.show.history(lossContainer, trainLogs, ["loss", "val_loss"]);
//     //       tfvis.show.history(accContainer, trainLogs, ["acc", "val_acc"]);
//     //     }
//     //   }
//     });
  
//     return model;
//   };
  
  

// const run = async() => {

//     const features = ["Glucose", "Age", "Insulin", "BloodPressure"];
//     const [trainDs, validDs, xTest, yTest] = createDataSets(data, features, 0.1, 16);
    
//     const model = await trainLogisticRegression(features.length, trainDs, validDs);
//     console.log(trainDs)
//     console.log(features)
//     const preds = model.predict(xTest).argMax(-1);
//     const labels = yTest.argMax(-1);

//     model.summary();
//     console.log(preds, labels)

// }

const pythonExec=()=> {
    const python_code = `print('Hello from Python')`

    const pyodide = window.pyodide;
    pyodide.runPython(python_code);
}

export default function Regression() {

    // const python_code = `print('Hello from Python')`

    // const pyodide = window.pyodide;
    // pyodide.runPython(python_code);

    // for (let d of data) {
    //     d.Age = +d.Age
    //     d.BMI = +d.BMI
    //     d.Glucose = +d.Glucose
    //     d.Outcome = +d.Outcome
    //     d.Insulin = +d.Insulin
    //     d.BloodPressure = +d.BloodPressure
    // }

    // console.log(data)

    // run();

    return (
        // Add the provider to your app
        <PythonProvider>
          <Codeblock />
        </PythonProvider>
    )

}