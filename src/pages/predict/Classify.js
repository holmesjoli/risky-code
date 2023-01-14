import Navigation from '../../components/Navigation';
import Description from '../../components/Description';
import Header from '../../components/Header';
import Sort from "../../components/Sort";

export function Content({items, setItems}) {

    return(
        <div className="Content">
            <Sort items={items} setItems={setItems} />
        </div>
    )
}

export default function Classify({config, items, setItems}) {

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <Navigation/>
                <div className="Content-Container">
                    <Description config={config}/>
                    <Content items={items} setItems={setItems} />
                </div>
            </div>
        </div>
    )
}
