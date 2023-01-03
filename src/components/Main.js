import React from 'react';
// import {setState} from 'react';
import Navigation from './Navigation';
import Header from './Header';
import Description from "./Description";
import Classify from "./pages/Classify";
import Train from "./pages/Train";
import Optimize from "./pages/Optimize";
import Calibration from "./pages/Calibration";

class Content extends React.Component{

    // area!;

    constructor(config) {
        super(config);
        this.componentID = config.config.id
        this.config = config.config
        this.render()
    }

    getComponent() {
        let component;
        switch (this.componentID) {
            case 'classify' :
                component = <Classify config={this.config}/>;
                break;
            case 'train' :
                component = <Train config={this.config}/>;
                break;
            case 'optimize' :
                component = <Optimize config={this.config}/>;
                break;
            case 'calibration' :
                component = <Calibration config={this.config}/>;
                break;
        }
        return component;
    };

    render() {
        return(
            <div className="Content">
                <Description config={this.config}/>
                {this.getComponent()}
            </div>
        );
    }
}

export default function Main(config) {

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <Navigation/>
                <Content config={config.config}/>
            </div>
        </div>
    )
};
