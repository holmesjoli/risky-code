import Main from "../../components/Main";
import { config }  from "../../utils/global";

export function Visualization() {
    return(
        <div className="Visualization">
        </div>
    )
}

export default function classify() {
    return(
        <Main config={config.classify}/>
    )
}
