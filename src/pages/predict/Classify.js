import Navigation from '../../components/Navigation';
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sort from "../../components/Sort";
import { Button } from "@material-ui/core";
import { useState} from "react";

export function Content({config, items, setItems}) {

    const [nClassified, setNClassified] = useState(0);

    return(
        <div className="Content">
            <h2 className="Title">{config.title}</h2>
            <Sort items={items} setItems={setItems} nClassified={nClassified} setNClassified={setNClassified}/>
            <div>
                <Button variant="outlined">Back</Button>
                <Button variant="contained" disabled={nClassified !== items.length}>Next</Button>
            </div>
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
                <Content config={config} items={items} setItems={setItems}/>
            </div>
            <Footer/>
        </div>
    )
}
