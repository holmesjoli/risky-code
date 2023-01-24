import { NavLink } from "react-router-dom";

export default function Header() {
    return (
    <div className="Header">
        <h1><NavLink to="/">Risky Code</NavLink></h1>
        <div className="Links">
            <NavLink className="Link" to="/Glossary">Glossary</NavLink>
            <NavLink className="Link" to="/Resources">Resources</NavLink>
        </div>
    </div>
    )
}
