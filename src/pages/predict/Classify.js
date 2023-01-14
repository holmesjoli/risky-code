import Main from "../../components/Main";
import Sort from "../../components/Sort";
import { config, CARDS }  from "../../utils/global";
import { useState } from "react";

export function Content() {
    const [items, setItems] = useState(CARDS);

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
