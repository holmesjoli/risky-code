import { NavLink } from "react-router-dom";

export default function Predict() {
    return (  
        <div className="Navigation Links">
            <ul>
                <li className="Navigation_link">
                    <NavLink to="/Classify" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Classify</NavLink>
                </li>
                <li className="Navigation_link">
                    <NavLink to="/Train" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Train</NavLink>
                </li>
                <li className="Navigation_link">
                    <NavLink to="/Optimize" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Optimize</NavLink>
                </li>
            </ul>
        </div>
    )
};