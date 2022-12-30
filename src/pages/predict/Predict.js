import Classify from './classify';
import { NavLink } from "react-router-dom";

export default function Predict() {
    return (  
        <div className="Navigation_links">
            <ul id="Navigation_list">
                <li className="Navigation_link">
                    <NavLink to="/classify" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Classify</NavLink>
                </li>
                <li className="Navigation_link">
                    <NavLink to="/train" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Train</NavLink>
                </li>
                <li className="Navigation_link">
                    <NavLink to="/optimize" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Optimize</NavLink>
                </li>
            </ul>
        </div>
    )
};