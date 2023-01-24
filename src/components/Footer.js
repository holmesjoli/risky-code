import { NavLink } from "react-router-dom";

export default function Footer() {
    return(
        <div className="Footer">
            <div className="Copyright Footer-Component">
                <span>Risky Code</span>
                <span>&copy;2023</span>
            </div>
            <div className="About Footer-Component">
                <div className="Summary">
                    <h6>Summary</h6>
                    <p>Risky Code is a workshop and digital toolkit addressing algorithmic fairness in a public policy context. Through a series of explanatory activities that visualize and simulate the application of AI, the design intends to facilitate deliberation.</p>
                </div>
                <div className="Site">
                    <h6>Site</h6>
                    <p>Site by <a href="https://joliholmes.com">Joli Holmes</a></p>
                </div>
            </div>
            <div className="Links Footer-Component">
                <h6>Nagivate</h6>
                <NavLink className="Link" to="/About">About</NavLink>
                <NavLink className="Link" to="/Contact">Contact</NavLink>
            </div>
        </div>
    )
}