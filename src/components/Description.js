
export default function Card({config}) {
    return(
        <div className="Description">
            <h3 className="Subtitle">{config.subtitle}</h3>
            <p>{config.descr}</p>
        </div>
    )
}