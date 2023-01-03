import React from 'react';
// import {setState} from 'react';
import Navigation from './Navigation';
import Header from './Header';
import Description from "./Description";
import * as Classify from "../pages/predict/Classify";
import * as Train from "../pages/predict/Train";
import * as Optimize from "../pages/predict/Optimize";
import * as Calibration from "../pages/fairness/Calibration";
import * as FalsePositive from "../pages/fairness/FalsePositive";
import * as FalseNegative from "../pages/fairness/FalseNegative";
import * as Compas from "../pages/case_studies/COMPAS";
import * as PublicPolicy from "../pages/case_studies/PublicPolicy";
import * as DecisionAid from "../pages/deliberation/DecisionAid";
import * as RiskFramework from "../pages/deliberation/RiskFramework";
import * as StakeholderMapping from "../pages/deliberation/Stakeholders";

class Content extends React.Component{

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
            case 'falsePositive' :
                component = <FalsePositive.Visualization/>;
                break;
            case 'falseNegative' :
                component = <FalseNegative.Visualization/>;
                break;
            case 'compas' :
                component = <Compas.Visualization/>;
                break;
            case 'publicPolicy' :
                component = <PublicPolicy.Visualization/>;
                break;
            case 'decisionAid' :
                component = <DecisionAid.Visualization/>;
                break;
            case 'riskFramework' :
                component = <RiskFramework.Visualization/>;
                break;
            case 'stakeholderMapping' :
                component = <StakeholderMapping.Visualization/>;
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
