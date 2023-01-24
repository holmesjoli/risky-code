import Navigation from '../../components/Navigation';
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sort from "../../components/Sort";

export function Content({config, items, setItems}) {

    return(
        <div className="Content">
            <h2 className="Title">{config.title}</h2>
            <Sort items={items} setItems={setItems} />
        </div>
    )
}

export default function Classify({config, items, setItems}) {

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <div className="Sidebar">
                    <Navigation/>
                    <Description config={config}/>
                </div>
                <Content config={config} items={items} setItems={setItems} />
            </div>
            <Footer/>
        </div>
    )
}
