import { importImages } from "./Helper";
import { CLASSIFY_COLUMN_NAMES, getModelVariables } from "../utils/global";

const { CASE_TRUE, CASE_FALSE } = CLASSIFY_COLUMN_NAMES;

export function addClass(column) {

    let name;
    if (column === CASE_TRUE) {
        name = "Case-True";
    } else if (column === CASE_FALSE) {
        name = "Case-False";
    } else {
        name = "Unclassified";
    }

    return name;
}

export default function Card({items, variables}) {

    const images = importImages();

    return(
        <div className="Cards-Container Container">
            <h4 className="Small-Margin">Items</h4>
            <div className="Card-Container">
                {items.map((item) => {
                    return( 
                        <div key={item.id+"Card-Id"} className={addClass(item.column)+" Card Flat"}>
                            <img src={images[Object.keys(images)[item.id]]} alt="An item of clothing" width="100" height="50" ></img>
                            {getModelVariables(variables).length > 0 ? (
                                 <div className="Washer"></div>
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