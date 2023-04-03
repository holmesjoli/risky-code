import { Accordion, AccordionSummary, AccordionDetails,  FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Progress from "./Progress";

export function Terminology({children, className, margin, defaultExpanded=false}) {

    return(
        <div className={"Terminology Margin-Top " + margin}>
            <Accordion defaultExpanded={defaultExpanded} className={className}>
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

export function Description({title, id, modules, children}) {
    return(
        <div className="Description Bottom-Rule Margin-Bottom">
            <h2 className="Margin-Bottom">{title}</h2>
            {children}
            <Progress id={id} modules={modules} className="Purple"/>
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


export function COMPASFair() {
    return(
        <div className="Container">
            <FormControl>
                <h4 className="Small-Margin">is compas fair?</h4>
                <p>Evaluate if you think COMPAS treats people fairly based on race.</p>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    className="Margin-Left"
                >
                    <FormControlLabel className="Purple" value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel className="Purple" value="no" control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>
    </div>
    )
}