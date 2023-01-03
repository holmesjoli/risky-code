import Main from "../components/Main";
import { config }  from "../utils/global";

export default function Introduction() {
    return(
        <Main config={config.introduction}/>
    )
}
