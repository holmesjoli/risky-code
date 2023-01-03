import Main from "../../components/Main";
import Card from "../../components/Card";
import { config }  from "../../utils/global";

export default function train() {
    return(
        <div>
            <Main config={config.train}/>
            <Card/>
        </div>
    )
}
