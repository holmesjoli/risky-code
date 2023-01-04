import Main from "../../components/Main";
import Card from "../../components/Card";
import Model from "../../components/Model";
import { config }  from "../../utils/global";

export function Content() {
    return(
        <div className="Content Three-Column">
            <Model/>
            <Card/>
            <div></div>
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
