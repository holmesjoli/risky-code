export function Description({config}) {
    return(
        <div className="Description">
            <div className="Container-Outlined">
                <h2 className="Title">{config.title}</h2>
                <h3 className="Subtitle">{config.subtitle}</h3>
                <p>{config.descr}</p>
            </div>
        </div>
    )
}

export function LeftSideBar({children}) {
    return(
        <div className="Sidebar-Left No-Padding-Top">
            {children}
        </div>
    )
}

export function RightSideBar({children}) {

    return(
        <div className="Sidebar-Right No-Padding-Top">
            {children}
        </div>
    )
}