import { importImages } from "./Helper";
import { CLASSIFY_COLUMN_NAMES } from "../utils/global";

const { ITEM_LIST, CASE_TRUE, CASE_FALSE } = CLASSIFY_COLUMN_NAMES;

export default function Card({items}) {

    const images = importImages()
    console.log(items)

    return(
        <div className="Cards-Container Container">
            <h5 className="Small-Margin">Items</h5>
            <div className="Card-Container">
                {items.map((item) => {

                    let name;
                    if (item.column === CASE_TRUE) {
                        name = "Case-True";
                    } else if (item.column === CASE_FALSE) {
                        name = "Case-False";
                    } else {
                        name = "Unclassified";
                    }

                    return( 
                        <div key={item.id+"id"} className={name+" Card Flat"}>
                            <img src={images[Object.keys(images)[item.id]]} alt="An item of clothing" width="100" height="50" ></img>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}