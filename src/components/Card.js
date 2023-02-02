import { importImages } from "./Helper";
import { CLASSIFY_COLUMN_NAMES, getModelVariables } from "../utils/global";

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

    console.log(items)

    return(
        <div className="Cards-Container Container">
            <h4 className="Small-Margin">Items</h4>
            <div className="Card-Container">
                {items.map((item) => {
                    return( 
                        <div key={item.id+"Card-Id"} className={addClass(item.column) + " " + addPredicted(item.predictedCorrectly) + " Card Flat"}>
                            <img src={images[Object.keys(images)[item.id]]} alt="An item of clothing" width="100" height="50" ></img>
                            {getModelVariables(variables).length > 0 ? (
                                 <div className="Washer">
                                    <span>{item.id + ": " + Math.round(item.predicted*100)/100}</span>
                                 </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
