import App from "../../App";
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

export default function train() {
    return(
        <div>
            <App config={config.train}/>
        </div>
    )
}
