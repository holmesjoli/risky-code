import { CARDS } from "../utils/global";

export default function Card({items}) {

    return(
        <div className="Cards-Container Container">
            <h5 className="Small-Margin">Items</h5>
            <div className="Card-Container">
                {CARDS.map(({id}, index) => {
                    return( 
                        <div key={id} className="Card">
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}