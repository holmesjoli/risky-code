import { NavLink } from "react-router-dom";

export default function CaseStudies() {
    return (  
        <div className="Navigation Links">
            <ul>
                <li className="Navigation_link">
                    <NavLink to="/PublicPolicy" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Algorithmic decision-making in public policy</NavLink>
                </li>
                <li className="Navigation_link">
                    <NavLink to="/COMPAS" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>COMPAS algorithm</NavLink>
                </li>
            </ul>
        </div>
    )
};