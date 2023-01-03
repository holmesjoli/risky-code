import Main from "../../components/Main";
import { config }  from "../../utils/global";

export default function publicPolicy() {
    return(
        <Main config={config.publicPolicy}/>
    )
}
