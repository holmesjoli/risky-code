
export default function Card({config}) {
    return(
        <div className="Description">
            <h3 className="Title">Goal</h3>
            <h4 className="Subtitle">{config.subtitle}</h4>
            <p>{config.descr}</p>
        </div>
    )
}