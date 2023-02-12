
export default function Card({config}) {
    return(
        <div className="Description">
            <h2 className="Title">{config.title}</h2>
            <h4 className="Subtitle">{config.subtitle}</h4>
            <p>{config.descr}</p>
        </div>
    )
}