import Main from "../../components/Main";
import Legend from "../../components/Legend";
import { config }  from "../../utils/global";

function Information() {
    return (
        <div className="Information">
            <Legend componentType={"default"}/>
        </div>
    )
}

export function Content() {
    return(
        <div className="Content Three-Column">
            <div></div>
            <div></div>
            <Information/>
        </div>
    )
}

export default function optimize() {
    return(
        <Main config={config.optimize}/>
    )
}
