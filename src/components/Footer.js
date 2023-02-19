import { NavLink } from "react-router-dom";

export default function Footer() {
    return(
        <div className="Footer">
            <div className="Copyright Footer-Component">
                <p className="Title">Risky Code</p>
                <p>&copy; 2023</p>
            </div>
            <div className="About Footer-Component">
                <div className="Summary">
                    <h3 className="Small-Margin">summary</h3>
                    <p>Risky Code is a workshop and digital toolkit addressing algorithmic fairness in a public policy context. Through a series of explanatory activities that visualize and simulate the application of AI, the design intends to facilitate deliberation.</p>
                </div>
            </div>
                <div className="Footer-Component">
                    <div className="Site">
                        <h3 className="Small-Margin">site</h3>
                        <p>Site by <a href="https://joliholmes.com">Joli Holmes</a></p>
                    </div>
                <div className="Links">
                    <h3 className="Small-Margin">navigate</h3>
                    <NavLink className="Link" to="/About">About</NavLink>
                    <NavLink className="Link" to="/Contact">Contact</NavLink>
                </div>
            </div>
        </div>
    )
}