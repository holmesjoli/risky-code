import App from "../../App";
import Sort from "../../components/Sort";
import { config }  from "../../utils/global";

export function Content({items, setItems}) {

    return(
        <div className="Content">
            <Sort items={items} setItems={setItems} />
        </div>
    )
}

export default function classify() {
    return(
        <App config={config.classify}/>
    )
}
