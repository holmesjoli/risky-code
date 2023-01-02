import { NavLink } from "react-router-dom";

export default function Header() {
    return (
    <div className="Header">
        <h2><NavLink to="/">Risky Code</NavLink></h2>
        <div className="Links">
            <NavLink className="add-link" to="/Glossary">Glossary</NavLink>
            <NavLink className="add-link" to="/Literature">Literature</NavLink>
            <NavLink className="add-link" to="/About">About</NavLink>
        </div>
    </div>
    )
}
