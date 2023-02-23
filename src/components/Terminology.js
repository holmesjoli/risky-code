import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function Terminology({children}) {

    return(
        <div className="Terminology">
            <Accordion>
            {/* <h4>Terminology</h4> */}
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