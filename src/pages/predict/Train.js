import Navigation from '../../components/Navigation';
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Model from "../../components/Model";
import Legend from "../../components/Legend";
import Card from "../../components/Card";
import Regression from "../../components/Regression";

function Information() {
    return (
        <div className="Information">
            <Legend componentType={"actual"}/>
        </div>
    )
}

export function Content({config, variables, setVariables, items, setItems}) {
    return(
        <div className="Content">
            <h2 className="Title">{config.title}</h2>
            <div className="Three-Column">
                <Model variables={variables} setVariables={setVariables}/>
                <Card items={items} variables={variables}/>
                <Regression items={items} setItems={setItems} variables={variables}/>
            </div>
        </div>
    )
}

export default function Train({config, variables, setVariables, items, setItems}) {
    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <div className="Sidebar">
                    <Navigation/>
                    <Description config={config}/>
                </div>
                <Content config={config} variables={variables} setVariables={setVariables} items={items} setItems={setItems}/>
            </div>
            <Footer/>
        </div>
    )
}