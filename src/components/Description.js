
export default function Card({title=null, subtitle=null, text=null}) {
    return(
        <div className="Description">
            <h3>{title}</h3>
            <h4>{subtitle}</h4>
            <p>{text}</p>
        </div>
    )
}