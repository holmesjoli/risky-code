
export default function Card({items}) {

    console.log(items)
    return(
        <div className="Cards-Container Container">
            <h5 className="Small-Margin">Items</h5>
            <div className="Card-Container">
                {items.map((item) => {
                    return( 
                        <div key={item.id+"id"}className="Card">
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}