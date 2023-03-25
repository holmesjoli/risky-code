import { NavLink } from "react-router-dom";

export default function Header() {
    return (
    <div className="Header">
        <h1 className="No-Margin-Bottom"><NavLink to="/">Risky Code</NavLink></h1>
        <div className="Links">
            <NavLink className="Link" to="/Glossary">glossary</NavLink>
            <NavLink className="Link" to="/Resources">resources</NavLink>
        </div>
    </div>
    )
}
