import Main from "../../components/Main";
import Navigation from '../../components/Navigation';
import Description from '../../components/Description';
import Header from '../../components/Header';
import Model from "../../components/Model";
import Legend from "../../components/Legend";
import { config }  from "../../utils/global";

function Information() {
    return (
        <div className="Information">
            <Legend componentType={"default"}/>
        </div>
    )
}

export function Content({variables, setVariables}) {
    return(
        <div className="Content Three-Column">
            <Model variables={variables} setVariables={setVariables} />
        </div>
    )
}

export default function Optimize({config, variables, setVariables, items}) {
    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <Navigation/>
                <div className="Content-Container">
                    <Description config={config}/>
                    <Content variables={variables} setVariables={setVariables} items={items} />
                </div>
            </div>
        </div>
    )
}
