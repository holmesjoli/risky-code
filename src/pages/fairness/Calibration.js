import Main from "../../components/Main";
import { config }  from "../../utils/global";
import Legend from "../../components/Legend";

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

export default function calibration() {
    return(
        <Main config={config.calibration}/>
    )
}
