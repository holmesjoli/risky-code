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

export function Role({moduleName, addTitle = true}) {

    if (moduleName === "prediction") {
        const title = " in algorithmic prediction";

        return(
            
            <div className={addTitle ? "Card-Group": "Container Margin-Top"}>
                <h3 className="Small-Margin">role{addTitle? title: ""}</h3>
                <p className="No-Margin-Bottom"><span className="Emphasis">You</span>, a busy individual who wants to learn more about algorithmic decision-making</p>
            </div>
        )
    } else if (moduleName === "fairness") {
        const title = " in algorithmic fairness";

        return(
            <div className={addTitle ? "Card-Group": "Container Margin-Top"}>
                <h3 className="Small-Margin">role{addTitle? title: ""}</h3>
                <p className="No-Margin-Bottom">A socially aware <span className="Emphasis">data scientist</span> interested in algorithmic fairness</p>
            </div>
        )
    } else if (moduleName === "caseStudies") {
        const title = " in case studies";

        return(
            <div className={addTitle ? "Card-Group": "Container Margin-Top"}>
                <h3 className="Small-Margin">role{addTitle? title: ""}</h3>
                <p className="No-Margin-Bottom">A socially aware <span className="Emphasis">designer</span> interested in bring design methods to algorithmic decision-making</p>
            </div>
        )
    } else if (moduleName === "deliberation") {
        const title = " in deliberation";

        return(
            <div className={addTitle ? "Card-Group": "Container Margin-Top"}>
                <h3 className="Small-Margin">role{addTitle? title: ""}</h3>
                <p className="No-Margin-Bottom">A <span className="Emphasis">public policymaker</span> interested in using algorithmic decision-making</p>
            </div>
        )
    }
}

export function RoleAccordion({moduleName}) {

    function definition(moduleName) {
        if (moduleName === "prediction") {
            return(
                <div className="Container-Rule">
                    <p className="No-Margin-Bottom"><span className="Emphasis">You</span>, a busy individual who wants to learn more about algorithmic decision-making</p>
                </div>
            )
        } else if (moduleName === "fairness") {
            return(
                <div className="Container-Rule">
                     <p className="No-Margin-Bottom">A socially aware <span className="Emphasis">data scientist</span> interested in algorithmic fairness</p>
                </div>
            )
        } else if (moduleName === "caseStudies") {
            return(
                <div className="Container-Rule">
                     <p className="No-Margin-Bottom">A socially aware <span className="Emphasis">designer</span> interested in bring design methods to algorithmic decision-making</p>
                </div>
            )
        } else if (moduleName === "deliberation") {
            return(
                <div className="Container-Rule">
                     <p className="No-Margin-Bottom">A <span className="Emphasis">public policymaker</span> interested in using algorithmic decision-making</p>
                </div>
            )
        }
    }

    let children = definition(moduleName);

    return(
        <Accordion className="Margin-Top">
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
            <div className="Expand">role</div>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    )
}