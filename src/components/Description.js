
export default function Card({title=null, text}) {
    return(
        <div className="Description">
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    )
}