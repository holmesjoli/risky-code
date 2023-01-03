import Main from "../../components/Main";
import { config }  from "../../utils/global";

export function Visualization() {
    return(
        <div className="Visualization">
        </div>
    )
}

export default function calibration() {
    return(
        <Main config={config.calibration}/>
    )
}
