import Navigation from '../components/Navigation';
import Description from '../components/Description';
import Header from '../components/Header';
import { config, glossary }  from "../utils/global";

export function Content() {

    return(
        <div className="Content">
            {Object.keys(glossary).map((term, index) => {

                // console.log(term)
                    return(
                        <div key={index} className="Term-Container">
                            <h4 className="Term-Name">{glossary[term].name}</h4>
                            <p className="Term-Definition">{glossary[term].definition}</p>
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
                    <Description config={config}/>
                    <Content />
                </div>
            </div>
        </div>
    )
}
