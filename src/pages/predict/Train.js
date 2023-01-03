import Main from "../../components/Main";
import Card from "../../components/Card";
import { config }  from "../../utils/global";

export function Visualization() {
    return(
        <div className="Visualization">
            <Card/>
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
