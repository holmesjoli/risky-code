import Main from "../../components/Main";
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
            <Model variables={variables} setVariables={setVariables}/>
        </div>
    )
}

export default function optimize() {
    return(
        <Main config={config.optimize}/>
    )
}
