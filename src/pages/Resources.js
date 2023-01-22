import Navigation from '../components/Navigation';
import Header from '../components/Header';
import { literature }  from "../utils/global";

export function Content() {
    return(
        <div className="Content">
            <div className="Literature-Container Container">
                <h4>Literature</h4>
                {Object.keys(literature).map((index) => {
                    return(
                            <p key={index} className="Literature-Reference">{literature[index].reference}
                            </p>
                        )
                    })
                    }
            </div>
            <div className="Resources-Container Container">
                <h4>AI Explainability Resources</h4>
            </div>
        </div>
    )
}

export default function Resources() {
    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <Navigation/>
                <div className="Content-Container">
                    <h3>Resources</h3>
                    <Content />
                </div>
            </div>
        </div>
    )
}
