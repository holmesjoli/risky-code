import { useEffect } from "react";
import * as d3 from 'd3';
import { getModelVariables } from "../utils/global";

export default function Accuracy({items, variables}) {

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
            <h3 className="Small-Margin">model accuracy</h3>
            <div className="Accuracy-Percent Small-Margin"></div>
            <p>Accuracy is a percent of how many predicted values match the actual values.</p>
        </div>
    )
}