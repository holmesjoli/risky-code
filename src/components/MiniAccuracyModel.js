import { useState, useEffect } from 'react';
import { PredictiveOutcomes, Threshold } from "./Regression";
import * as d3 from 'd3';

function Accuracy({predictiveProbability}) {

    useEffect(() => {

        d3.selectAll(".Accuracy-Percent")
            .text(predictiveProbability > 28 ? "100%": "0%");

    }, [predictiveProbability])

    return(
        <div>
            <div className="Container">
                <h4 className="Small-Margin">model accuracy</h4>
                <p>Accuracy is a percent of how many predicted values match the actual values.</p>
                <h5 className="Accuracy-Percent Small-Margin No-Margin-Top Semi-Bold White Opacity1"></h5>
            </div>
        </div>
    )
}

export default function MiniModel() {

    const [predictiveProbability, setPredictiveProbability] = useState(50);

    const updateSlider = (event, value) => {

        console.log(value)
        setPredictiveProbability(value)
    };

    return(
        <div>
            <div className="Bottom-Rule">
                <div className="Row">
                    <Threshold predictiveProbability={predictiveProbability} updateSlider={updateSlider}/>
                </div>
            </div>
            <div className="Row Padding-Top">
                <PredictiveOutcomes predictiveProbability={predictiveProbability}/>
                <Accuracy predictiveProbability={predictiveProbability}/>
            </div>
        </div>
    )
}