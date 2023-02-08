import { importImages } from "./Helper";
import { CLASSIFY_COLUMN_NAMES, getModelVariables } from "../utils/global";
import { useEffect } from "react";
import * as d3 from 'd3';

const { CASE_TRUE, CASE_FALSE } = CLASSIFY_COLUMN_NAMES;

export function addClass(column) {

    if (column === CASE_TRUE) {
        return "Case-True";
    } else if (column === CASE_FALSE) {
        return "Case-False";
    } else {
        return "Unclassified";
    }
}

export function addPredicted(predicted) {

    if (predicted) {
        return "Predicted-True";
    } else {
        return "Predicted-False";
    }
}

export default function Card({items, variables}) {

    const images = importImages();
    const modelVars = getModelVariables(variables);

    useEffect(() => {

        if (modelVars.length > 0 ) {
            d3.selectAll(".predicted")
                .text(function() {
                    let id = +this.getAttribute("id").match(/\d+/)[0];
                    let predictedProbability = items.find((d) => d.id === id).predictedProbability;
                    return predictedProbability !== undefined ? Math.round(predictedProbability*100)/100: ""})

            d3.selectAll(".Card")
                .attr("class", function() {
                    let id = +this.getAttribute("id").match(/\d+/)[0];
                    let predictedCorrectly = items.find((d) => d.id === id).predictedCorrectly;
                    let column = items.find((d) => d.id === id).column;
                    return predictedCorrectly!== undefined ? addClass(column) + " Card Card-Flat" + " " + addPredicted(predictedCorrectly): "";
                })
            
            d3.selectAll("#Predicted-Container")
                .attr("class", "my-grid Visible")

        } else {
            d3.selectAll(".predicted")
                .text("")

            d3.selectAll(".Card")
                .attr("class", function() {
                    let id = +this.getAttribute("id").match(/\d+/)[0];
                    let column = items.find((d) => d.id === id).column;
                    return addClass(column) + " Card Card-Flat";
                })

            d3.selectAll("#Predicted-Container")
                .attr("class", "my-grid Hidden")
        }
    }, [items, variables])

    const createCard = (items) => {
        return items.map((item) => {
            return( 
                <div key={item.id+"Card-Id"} id={item.id+"Card-Id"} className={addClass(item.column) + " Card Card-Flat"}>
                    <img src={images[Object.keys(images)[item.id]]} alt="An item of clothing" width="100" height="50" ></img>
                        <span id={item.id + "-predicted"} className="predicted"></span>
                </div>
            )
        })
    }

    return(
        <div className="Cards-Container Container">
            <h4 className="Small-Margin">Items</h4>
            <div className="Card-Container">
                   {createCard(items)}
            </div>
        </div>
    )
}
