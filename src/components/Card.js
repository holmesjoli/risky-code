import { CARDS } from "../utils/global";

export default function Card() {

    return(
        <div className="Card-Container">

            {CARDS.map(({id, name}, index) => {
                return( 
                <div key={id} className="Card"></div>
                )
            })
            }
        </div>
    )
}