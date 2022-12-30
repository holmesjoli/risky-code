import { NavLink } from "react-router-dom";
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import Predict from '../pages/predict/Predict';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

/**
 * Menu Navigation bar to navigate to different parts of the project
 * @returns 
 */
export default function Navigation() {
    return (
        <div className="Navigation">
            <div className="Navigation_branding">
                <h2><NavLink to="/">Risky Code</NavLink></h2>
            </div>            
            <div className="Navigation_links">
            </div>
            <div className="Navigation_content">
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <h4>Predict</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Predict/>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
}