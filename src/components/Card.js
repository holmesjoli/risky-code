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
    const modelVars = getModelVariables(variables);

    useEffect(() => {

        if (modelVars.length > 0 ) {

            d3.selectAll(".predicted")
            .text(function() {
                let id = +this.getAttribute("id").match(/\d+/)[0];
                let predicted = items.find((d) => d.id === id).predicted;
                return predicted !== undefined ? Math.round(predicted*100)/100: ""})
            // .attr("class", function() {
            //     let id = +this.getAttribute("id").match(/\d+/)[0];
            //     let predictedCorrectly = items.find((d) => d.id === id).predictedCorrectly;
            //     return predictedCorrectly!== undefined ? predictedCorrectly: "";
            // })

        } else {
            let obj = d3.selectAll(".predicted");
            d3.selectAll(".predicted g").remove();
            obj = obj.append("g");
        }

    }, [items, variables])


    const createCard = (items) => {
        return items.map((item) => {
            return( 
                <div key={item.id+"Card-Id"} className={addClass(item.column) + " Card Flat"}>
                    <img src={images[Object.keys(images)[item.id]]} alt="An item of clothing" width="100" height="50" ></img>
                    <div>
                        <span id={item.id + "-predicted"} className="predicted"></span>
                    </div>
                </div>
            )
        })
    }

    console.log(items)

    // console.log(variables)
    // console.log(items)

    return(
        <div className="Cards-Container Container">
            <h4 className="Small-Margin">Items</h4>
            <div className="Card-Container">
                   {createCard(items)}
            </div>
        </div>
    )
}
