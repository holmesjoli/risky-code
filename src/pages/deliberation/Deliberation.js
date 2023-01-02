import { NavLink } from "react-router-dom";

export default function Deliberation() {
    return (  
        <div className="Navigation Links">
            <ul>
                <li className="Navigation_link">
                    <NavLink to="/RiskFramework" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Greene AI Risk Framework</NavLink>
                </li>
                <li className="Navigation_link">
                    <NavLink to="/Stakeholders" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Stakeholders</NavLink>
                </li>
                <li className="Navigation_link">
                    <NavLink to="/DecisionAid" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Decision Aid</NavLink>
                </li>
            </ul>
        </div>
    )
};