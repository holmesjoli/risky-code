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

    if (predicted !== undefined) {

        if (predicted) {
            return "Predicted-True";
        } else {
            return "Predicted-False";
        }
    }
}


export default function Card({items, variables}) {

    const images = importImages();
    var modelVars = getModelVariables(variables);
    console.log(items)

    const createCard = (items) => {
        return items.map((item) => {
            return( 
                <div key={item.id+"Card-Id"} className={addClass(item.column) + " " + addPredicted(item.predictedCorrectly) + " Card Flat"}>
                    <img src={images[Object.keys(images)[item.id]]} alt="An item of clothing" width="100" height="50" ></img>
                    <div id={item.id} className="predicted"></div>
                </div>
            )
        })
    }

    // useEffect(() => {

    //     if (modelVars.length > 0 ) {

    //         for (let i of items) {

    //             if (i.predicted !== undefined) {
    //                 d3
    //                     .selectAll(".predicted")
    //                     .text(Math.round(i.predicted*100)/100)
    //             }
    //         }
    //     }

    // }, [items, modelVars])

    return(
        <div className="Cards-Container Container">
            <h4 className="Small-Margin">Items</h4>
            <div className="Card-Container">
                   {createCard(items)}
            </div>
        </div>
    )
}
