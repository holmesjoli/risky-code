import { importImages } from "./Helper";
import { CLASSIFY_COLUMN_NAMES } from "../utils/global";

const { ITEM_LIST, CASE_TRUE, CASE_FALSE } = CLASSIFY_COLUMN_NAMES;

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

export default function Card({items}) {

    const images = importImages();

    return(
        <div className="Cards-Container Container">
            <h5 className="Small-Margin">Items</h5>
            <div className="Card-Container">
                {items.map((item) => {

                    let cName = addClass(item.column);

                    return( 
                        <div key={item.id+"id"} className={cName+" Card Flat"}>
                            <img src={images[Object.keys(images)[item.id]]} alt="An item of clothing" width="100" height="50" ></img>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}