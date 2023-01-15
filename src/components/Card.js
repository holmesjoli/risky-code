import { importImages } from "./Helper";
import { CLASSIFY_COLUMN_NAMES } from "../utils/global";

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

export default function Card({items, modelVariableSelected}) {

    const images = importImages();

    console.log(items)

    return(
        <div className="Cards-Container Container">
            <h5 className="Small-Margin">Items</h5>
            <div className="Card-Container">
                {items.map((item) => {
                    return( 
                        <div key={item.id+"Card-Id"} className={addClass(item.column)+" Card Flat"}>
                            <img src={images[Object.keys(images)[item.id]]} alt="An item of clothing" width="100" height="50" ></img>
                            {modelVariableSelected ? (
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