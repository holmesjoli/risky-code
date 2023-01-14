
export default function Card({config}) {
    return(
        <div className="Description Container">
            <h3>{config.title}</h3>
            <h4>{config.subtitle}</h4>
            <p>{config.descr}</p>
        </div>
    )
}