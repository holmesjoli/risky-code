import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import Predict from '../pages/predict/Predict';
import Fairness from '../pages/fairness/Fairness';
import CaseStudies from '../pages/case_studies/CaseStudies';
import Deliberation from '../pages/deliberation/Deliberation';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

/**
 * Menu Navigation bar to navigate to different parts of the project
 * @returns 
 */
export default function Navigation() {
    return (
        <div className="Navigation">  
            <div className="Navigation Links">
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

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <h4>Fairness</h4>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Fairness/>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <h4>Fairness in context</h4>
                        </AccordionSummary>
                        <AccordionDetails>
                            <CaseStudies/>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <h4>Deliberation</h4>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Deliberation/>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}