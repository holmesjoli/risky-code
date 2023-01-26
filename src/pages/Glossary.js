import Navigation from '../components/Navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { glossary }  from "../utils/global";
import { NavLink } from "react-router-dom";

export function Content() {
    return(
        <div className="Content">
            {Object.keys(glossary).map((term, index) => {
                return(
                    <div key={index} className="Term-Container Container">
                        <h3 className="Term-Name">{glossary[term].name}</h3>
                        <p>
                            <span className="Term-Definition">{glossary[term].definition}</span>
                            <NavLink className="Term-Citation" to="/Resources"> {glossary[term].citation}</NavLink>
                        </p>
                    </div>
                    )
                })
                }
        </div>
    )
}

export default function Glossary() {
    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <div className="Sidebar">
                    <Navigation/>
                </div>
                <Content />
            </div>
            <Footer/>
        </div>
    )
}
