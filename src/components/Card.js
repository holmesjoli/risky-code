import { importImages } from "./Helper";

export default function Card({items}) {

    const images = importImages()
    console.log(items)

    return(
        <div className="Cards-Container Container">
            <h5 className="Small-Margin">Items</h5>
            <div className="Card-Container">
                {items.map((item) => {
                    return( 
                        <div key={item.id+"id"}className="Card Flat">
                            <img src={images[Object.keys(images)[item.id]]} alt="An item of clothing" width="100" height="50" ></img>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}