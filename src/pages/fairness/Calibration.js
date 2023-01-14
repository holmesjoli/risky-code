import App from "../../App";
import { config }  from "../../utils/global";
import Legend from "../../components/Legend";

function Information() {
    return (
        <div className="Information">
            <Legend componentType={"points"}/>
        </div>
    )
}

export function Content() {
    return(
        <div className="Content Three-Column">
            <Information/>
        </div>
    )
}

export default function calibration() {
    return(
        <App config={config.calibration}/>
    )
}
