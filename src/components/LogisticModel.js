import * as tf from '@tensorflow/tfjs';
import * as d3 from 'd3';
import trainingData from '../data/processed/strike_zone_training_data.json';
import testData from '../data/processed/strike_zone_test_data.json'

// Normalize a value between a given range.
function normalize(value, min, max) {
    if (min === undefined || max === undefined) {
      return value;
    }
    return (value - min) / (max - min);
}
  
export default function LogisticModel() {

    // const TRAIN_DATA_PATH =
    // 'https://storage.googleapis.com/mlb-pitch-data/strike_zone_training_data.csv';
    // const TEST_DATA_PATH =
    //     'https://storage.googleapis.com/mlb-pitch-data/strike_zone_test_data.csv';

    // const TRAIN_DATA_PATH = '../data/raw/strike_zone_training_data.csv';
    // const TEST_DATA_PATH = '../data/raw/strike_zone_test_data.csv';

    // Constants from training data:
    const PX_MIN = -2.65170604056843;
    const PX_MAX = 2.842899614;
    const PZ_MIN = -2.01705841594049;
    const PZ_MAX = 6.06644249133382;
    const SZ_TOP_MIN = 2.85;
    const SZ_TOP_MAX = 4.241794863019148;
    const SZ_BOT_MIN = 1.248894636863092;
    const SZ_BOT_MAX = 2.2130980270561516;

    const TRAINING_DATA_LENGTH = 10000;
    const TEST_DATA_LENGTH = 200;

    // Converts a row from the CSV into features and labels.
    // Each feature field is normalized within training data constants:

    // for (i in )

    // const csvTransform = ({xs, ys}) => {
    //     const values = [
    //         normalize(xs.px, PX_MIN, PX_MAX), 
    //         normalize(xs.pz, PZ_MIN, PZ_MAX),
    //         normalize(xs.sz_top, SZ_TOP_MIN, SZ_TOP_MAX),
    //         normalize(xs.sz_bot, SZ_BOT_MIN, SZ_BOT_MAX), 
    //         xs.left_handed_batter
    //     ];
    //     return {'xs': values, 'ys': ys.is_strike};
    // };

    const train = {'xs': 
                [trainingData.map((d) => +d.left_handed_batter)],
            'ys': trainingData.map((d) => +d.is_strike)
    }

    const testValidationData = {'xs': 
                [testData.map((d) => +d.left_handed_batter)],
            'ys': testData.map((d) => +d.is_strike)
    }
    // console.log(train, test)

    // trainingData = trainingData
    //     // tf.data.csv(TRAIN_DATA_PATH, {columnConfigs: {isStrike: {isLabel: true}}})
    //     // tf.data.csv(TRAIN_DATA_PATH)
    //         .map(csvTransform)
    //         .shuffle(TRAINING_DATA_LENGTH)
    //         .batch(50);

    // const testValidationData = testData
    //     // tf.data.csv(TEST_DATA_PATH, {columnConfigs: {is_strike: {isLabel: true}}})
    //     // tf.data.csv(TEST_DATA_PATH)
    //         .map(csvTransform)
    //         .batch(TEST_DATA_LENGTH);

    const model = tf.sequential();
    model.add(tf.layers.dense({units: 20, activation: 'relu', inputShape: [1]}));
    model.add(tf.layers.dense({units: 10, activation: 'relu'}));
    model.add(tf.layers.dense({units: 2, activation: 'softmax'}));
    model.compile({
        optimizer: tf.train.adam(),
        loss: 'sparseCategoricalCrossentropy',
        metrics: ['accuracy']
    });

    const sz_model = {
        model,
        testValidationData,
        trainingData,
        TEST_DATA_LENGTH
    };

    async function run(epochCount, savePath) {
        sz_model.model.summary();
        await sz_model.model.fitDataset(sz_model.trainingData, {
          epochs: epochCount,
          callbacks: {
            onEpochEnd: async (epoch, logs) => {
              console.log(`Epoch: ${epoch} - loss: ${logs.loss.toFixed(3)}`);
            }
          }
        });
      
        // Eval against test data:
        await sz_model.testValidationData.forEachAsync(data => {
          const evalOutput =
              sz_model.model.evaluate(data.xs, data.ys, sz_model.TEST_DATA_LENGTH);
      
          console.log(
              `\nEvaluation result:\n` +
              `  Loss = ${evalOutput[0].dataSync()[0].toFixed(3)}; ` +
              `Accuracy = ${evalOutput[1].dataSync()[0].toFixed(3)}`);
        });
      
        if (savePath !== null) {
          await sz_model.model.save(`file://${savePath}`);
          console.log(`Saved model to path: ${savePath}`);
        }
      }
      
      run(20)
}

