import Main from "../../components/Main";
import { config }  from "../../utils/global";

export function Content() {
    return(
        <div className="Content">
        </div>
    )
}

export default function optimize() {
    return(
        <Main config={config.optimize}/>
    )
}
