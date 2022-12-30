import { NavLink } from "react-router-dom";

export default function Fairness() {
    return (  
        <div className="Navigation_links">
            <ul>
                <li className="Navigation_link">
                    <NavLink to="/Calibration" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Calibration</NavLink>
                </li>
                <li className="Navigation_link">
                    <NavLink to="/FalseNegative" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>False Negative</NavLink>
                </li>
                <li className="Navigation_link">
                    <NavLink to="/FalsePositive" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>False Positive</NavLink>
                </li>
            </ul>
        </div>
    )
};