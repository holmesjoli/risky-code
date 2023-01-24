
export default function Card({config}) {
    return(
        <div className="Description Container">
            <h2 className="Title">{config.title}</h2>
            <h3 className="Subtitle">{config.subtitle}</h3>
            <p>{config.descr}</p>
        </div>
    )
}