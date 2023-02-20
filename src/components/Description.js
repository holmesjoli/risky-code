
export default function Card({config}) {
    return(
        <div className="Description">
            <h2 className="Title">{config.title}</h2>
            {/* <h4 className="Goal">Module goal</h4> */}
            <div className="Container-Outlined">
                <h5 className="Subtitle">{config.subtitle}</h5>
                <p>{config.descr}</p>
            </div>
        </div>
    )
}

