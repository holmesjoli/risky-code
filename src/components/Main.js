import React from 'react';
// import {setState} from 'react';
import Navigation from './Navigation';
import Header from './Header';
import Description from "./Description";
import * as Classify from "../pages/predict/Classify";
import * as Train from "../pages/predict/Train";
import * as Optimize from "../pages/predict/Optimize";
import * as Calibration from "../pages/fairness/Calibration";

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
                component = <Classify.Visualization/>;
                break;
            case 'train' :
                component = <Train.Visualization/>;
                break;
            case 'optimize' :
                component = <Optimize.Visualization/>;
                break;
            case 'calibration' :
                component = <Calibration.Visualization/>;
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
