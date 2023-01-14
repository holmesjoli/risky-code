import Main from "../../components/Main";
import { config }  from "../../utils/global";
import Sort from "../../components/Sort";

export function Content() {
    return(
        <div className="Content">
            <Sort/>
        </div>
    )
}

export default function classify() {
    return(
        <Main config={config.classify}/>
    )
}
