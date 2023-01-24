import { NavLink } from "react-router-dom";
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

/**
 * Menu Navigation bar to navigate to different parts of the project
 * @returns 
 */

function Introduction() {
    return(
        <div className="Link-Container">
            <h3 className="Introduction Link">
                <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Introduction</NavLink>
            </h3>
        </div>
    )
}

function Predict() {
    return (
        <div className="Link-Container">
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <h3>Predict</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="Navigation Links">
                        <ul>
                            <li className="Link">
                                <NavLink to="/Classify" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Classify</NavLink>
                            </li>
                            <li className="Link">
                                <NavLink to="/Train" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Train</NavLink>
                            </li>
                            <li className="Link">
                                <NavLink to="/Optimize" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Optimize</NavLink>
                            </li>
                        </ul>
                    </div>
            </AccordionDetails>
        </Accordion>
    </div>
    )
};

function Fairness() {
    return ( 
        <div className="Link-Container">
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <h3>Fairness</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="Navigation Links">
                        <ul>
                            <li className="Link">
                                <NavLink to="/Calibration" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Calibration</NavLink>
                            </li>
                            <li className="Link">
                                <NavLink to="/FalseNegative" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>False Negative</NavLink>
                            </li>
                            <li className="Link">
                                <NavLink to="/FalsePositive" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>False Positive</NavLink>
                            </li>
                        </ul>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
};

function CaseStudies() {
    return (
        <div className="Link-Container">
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <h3>Fairness in context</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="Navigation Links">
                        <ul>
                            <li className="Link">
                                <NavLink to="/PublicPolicy" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Algorithmic decision-making in public policy</NavLink>
                            </li>
                            <li className="Link">
                                <NavLink to="/COMPAS" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>COMPAS algorithm</NavLink>
                            </li>
                        </ul>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
};

function Deliberation() {
    return (
        <div className="Link-Container">
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <h3>Deliberation</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="Navigation Links">
                        <ul>
                            <li className="Link">
                                <NavLink to="/RiskFramework" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Greene AI Risk Framework</NavLink>
                            </li>
                            <li className="Link">
                                <NavLink to="/Stakeholders" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Stakeholders</NavLink>
                            </li>
                            <li className="Link">
                                <NavLink to="/DecisionAid" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Decision Aid</NavLink>
                            </li>
                        </ul>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
};

export default function Navigation() {
    return (
        <div className="Navigation">  
            <Introduction/>
            <Predict/> 
            <Fairness/>
            <CaseStudies/> 
            <Deliberation/>
        </div>
    )
}
