import Navigation from '../../components/Navigation';
import Description from '../../components/Description';
import Header from '../../components/Header';
import Model from "../../components/Model";
import Legend from "../../components/Legend";
import Card from "../../components/Card";
import { config }  from "../../utils/global";

function Information() {
    return (
        <div className="Information">
            <Legend componentType={"actual"}/>
        </div>
    )
}

export function Content({variables, setVariables, items}) {
    return(
        <div className="Content Three-Column">
            <Model variables={variables} setVariables={setVariables}/>
            <Card items={items}/>
        </div>
    )
}

export default function Train({config, variables, setVariables, items}) {
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
