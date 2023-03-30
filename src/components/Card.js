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

export function Card({items}) {

    const images = importImages();

    const createCard = (items) => {
        return items.map((item) => {
            return( 
                <div key={"Card-Id"+item.id} id={"Card-Id"+item.id} className={addClass(item.column) + " Card Card-Flat"}>
                    <img src={images[Object.keys(images)[item.id]]} alt="An item of clothing" width="100" height="50" ></img>
                        <h5 id={item.id + "-predicted"} className="predicted Semi-Bold"></h5>
                </div>
            )
        })
    }

    return(
        <div className="Cards-Container Container">
            <h4 className="Small-Margin">clothing items</h4>
            <div className="Card-Container">
                   {createCard(items)}
            </div>
        </div>
    )
}

export function updateCard(items, variables, addIncorrect=false) {

    var modelVars = getModelVariables(variables);

    if (modelVars.length > 0 ) {

        d3.selectAll(".predicted.Semi-Bold")
            .text(function() {
                let id = +this.getAttribute("id").match(/\d+/)[0];
                let predictedProbability = items.find((d) => d.id === id).predictedProbability;
                return predictedProbability !== undefined ? Math.round(predictedProbability*100)/100: ""});

        if (addIncorrect) {
            d3.selectAll(".Card")
            .attr("class", function() {
                let id = +this.getAttribute("id").match(/\d+/)[0];
                let predictedCorrectly = items.find((d) => d.id === id).predictedCorrectly;
                let column = items.find((d) => d.id === id).column;
                return predictedCorrectly!== undefined ? addClass(column) + " Card Card-Flat" + " " + addPredicted(predictedCorrectly): "";
            });
        }
    } else {
        d3.selectAll(".predicted.Semi-Bold")
            .text("");

        d3.selectAll(".Card")
            .attr("class", function() {
                let id = +this.getAttribute("id").match(/\d+/)[0];
                let column = items.find((d) => d.id === id).column;
                return addClass(column) + " Card Card-Flat";
            });
    }
}

