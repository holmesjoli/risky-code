import Navigation from '../components/Navigation';
import Header from '../components/Header';
import { glossary }  from "../utils/global";
import { NavLink } from "react-router-dom";

export function Content() {
    return(
        <div className="Content">
            {Object.keys(glossary).map((term, index) => {
                return(
                    <div key={index} className="Term-Container Container">
                        <h4 className="Term-Name">{glossary[term].name}</h4>
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
                <Navigation/>
                <div className="Content-Container">
                    <h3>Glossary</h3>
                    <Content />
                </div>
            </div>
        </div>
    )
}
