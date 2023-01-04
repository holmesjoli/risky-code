import Main from "../../components/Main";
import { config }  from "../../utils/global";

export function Content() {
    return(
        <div className="Content">
        </div>
    )
}

export default function classify() {
    return(
        <Main config={config.classify}/>
    )
}
