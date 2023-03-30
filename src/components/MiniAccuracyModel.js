import { useState, useEffect } from 'react';
import { PredictiveOutcomes, Threshold } from "./Regression";
import * as d3 from 'd3';

function Accuracy() {

    return(
        <div>
            <div className="Container2">
                <h4 className="Small-Margin">model accuracy</h4>
                <p className="No-Margin-Bottom"> Accuracy is a percent of how many predicted values match the actual values. In this example, the accuracy is either 0 or 100%, because there is only one item.</p>
                <h5 className="Accuracy-Percent Small-Margin No-Margin-Top No-Margin-Bottom Semi-Bold White Opacity1"></h5>
            </div>
        </div>
    )
}

export default function MiniModel() {

    const [predictiveProbability, setPredictiveProbability] = useState(50);

    const updateSlider = (event, value) => {
        setPredictiveProbability(value)
    };

    useEffect(() => {
        d3.selectAll(".Accuracy-Percent")
            .text(predictiveProbability > 28 ? "100%": "0%");
    }, [predictiveProbability])

    return(
        <div>
            <div className="Bottom-Rule">
                <div className="Row">
                    <Threshold predictiveProbability={predictiveProbability} updateSlider={updateSlider} containerClass="Container2"/>
                </div>
            </div>
            <div className="Two-Column Padding-Top">
                <PredictiveOutcomes predictiveProbability={predictiveProbability} containerClass="Container2"/>
                <Accuracy />
            </div>
        </div>
    )
}