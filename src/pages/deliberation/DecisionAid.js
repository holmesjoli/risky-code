import App from "../../App";
import { config }  from "../../utils/global";

export function Content() {
    return(
        <div className="Content">
        </div>
    )
}

export default function decisionAid() {
    return(
        <App config={config.decisionAid}/>
    )
}
