import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export function Terminology({children, margin, defaultExpanded=false}) {

    return(
        <div className={"Terminology Margin-Top " + margin}>
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
        <div className="Description Bottom-Rule">
            <div className="">
                <h2 className="Title Padding-Bottom">{config.title}</h2>
                {children}
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

export function Role({moduleName}) {

    if (moduleName === "prediction") {
        return(
            <div className="Card-Group">
                <h4 className="Small-Margin">role in algorithmic prediction</h4>
                <p><span className="Emphasis">You</span>, a busy individual who wants to learn more about algorithmic decision-making</p>
            </div>
        )
    } else if (moduleName === "fairness") {
        return(
            <div className="Card-Group">
                <h4 className="Small-Margin">role in algorithmic fairness</h4>
                <p>A socially aware <span className="Emphasis">data scientist</span> interested in algorithmic fairness</p>
            </div>
        )
    } else if (moduleName === "caseStudies") {
        return(
            <div className="Card-Group">
                <h4 className="Small-Margin">role in case studies</h4>
                <p>A socially aware <span className="Emphasis">designer</span> interested in bring design methods to algorithmic decision-making</p>
            </div>
        )
    } else if (moduleName === "deliberation") {
        return(
            <div className="Card-Group">
                <h4 className="Small-Margin">role  in deliberation</h4>
                <p>A <span className="Emphasis">public policymaker</span> interested in using algorithmic decision-making</p>
            </div>
        )
    }
}
