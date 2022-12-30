import { NavLink } from "react-router-dom";

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
                <ul id="Navigation_list">
                    <li className="Navigation_link">
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Classify</NavLink>
                    </li>
                    <li className="Navigation_link">
                        <NavLink to="/Analyze" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Train</NavLink>
                    </li>
                    <li className="Navigation_link">
                        <NavLink to="/Simulate" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Optimize</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}