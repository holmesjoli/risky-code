import Main from "../../components/Main";
import Model from "../../components/Model";
import Legend from "../../components/Legend";
import { config }  from "../../utils/global";

function Information() {
    return (
        <div className="Information">
            <Legend componentType={"actual"}/>
        </div>
    )
}

export function Content() {
    return(
        <div className="Content Three-Column">
            <Model/>
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
