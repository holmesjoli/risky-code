import App from "../App";
import { config }  from "../utils/global";

export function Content() {
    return(
        <div className="Content">
        </div>
    )
}

export default function About() {
    return(
        <App config={config.about}/>
    )
}
