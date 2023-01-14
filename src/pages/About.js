import Main from "../components/Main";
import { config }  from "../utils/global";

export function Content() {
    return(
        <div className="Content">
        </div>
    )
}

export default function About() {
    return(
        <Main config={config.about}/>
    )
}
