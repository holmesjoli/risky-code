import Main from "../../components/Main";
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
        <Main config={config.classify}/>
    )
}
