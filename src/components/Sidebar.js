import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export function Terminology({children, margin, defaultExpanded=false}) {

    return(
        <div className={"Terminology " + margin}>
            <Accordion defaultExpanded={defaultExpanded}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                <div className="Expand">terminology</div>
                </AccordionSummary>
                <AccordionDetails>
                    {children}
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export function Term({term}) {
    return(
        <div className="Container-Rule">
            <h4 className="Small-Margin">{term.title}</h4>
            <p>{term.definition}</p>
        </div>
    )
}

export function Description({config, children}) {
    return(
        <div className="Description">
            <div className="Container-Outlined">
                <h2 className="Title">{config.title}</h2>
                {/* <h3 className="Subtitle">{config.subtitle}</h3> */}
                {children}
                {/* <p>{config.descr}</p> */}
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