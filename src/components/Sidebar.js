export function LeftSideBar({children}) {
    return(
        <div className="Sidebar-Left">
            {children}
        </div>
    )
}

export function RightSideBar({children}) {

    return(
        <div className="Sidebar-Right">
            {children}
        </div>
    )
}