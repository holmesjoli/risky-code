import Main from "../../components/Main";
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
            {/* <Card/>
            <Information/> */}
        </div>
    )
}

export default function train() {
    return(
        <div>
            <Main config={config.train}/>
        </div>
    )
}
