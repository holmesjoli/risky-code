import { useState, useEffect } from 'react';
import { PredictiveOutcomes, Threshold } from "./Regression";
import * as d3 from 'd3';
import { Predicted } from "./Legend";

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
            <div className="">
                <div className="Row">
                    <Threshold predictiveProbability={predictiveProbability} updateSlider={updateSlider} containerClass="Container2"/>
                </div>
            </div>
            <div className="Two-Column2">
                <Predicted className = "Container2"/>
                <PredictiveOutcomes predictiveProbability={predictiveProbability} containerClass="Container2"/>
            </div>
        </div>
    )
}