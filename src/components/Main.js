import React from 'react';
// import {setState} from 'react';
import Navigation from './Navigation';
import Header from './Header';
import Description from "./Description";
import * as About from "../pages/About";
import * as Glossary from "../pages/Glossary";
import * as Introduction from "../pages/Introduction";
import * as Literature from "../pages/Literature";
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

class ContentContainer extends React.Component {
    
    constructor({config}) {

        super();
        this.config = config
        this.render()
    }

    getComponent() {
        let component;
        switch (this.config.componentID) {
            default:
                component = <Introduction.Content/>
                break;
            case 'classify' :
                component = <Classify.Content/>;
                break;
            case 'train' :
                component = <Train.Content/>;
                break;
            case 'optimize' :
                component = <Optimize.Content/>;
                break;
            case 'calibration' :
                component = <Calibration.Content/>;
                break;
            case 'falsePositive' :
                component = <FalsePositive.Content/>;
                break;
            case 'falseNegative' :
                component = <FalseNegative.Content/>;
                break;
            case 'compas' :
                component = <Compas.Content/>;
                break;
            case 'publicPolicy' :
                component = <PublicPolicy.Content/>;
                break;
            case 'decisionAid' :
                component = <DecisionAid.Content/>;
                break;
            case 'riskFramework' :
                component = <RiskFramework.Content/>;
                break;
            case 'stakeholderMapping' :
                component = <StakeholderMapping.Content/>;
                break;
            case 'glossary' :
                component = <Glossary.Content/>;
                break;
            case 'literature' :
                component = <Literature.Content/>;
                break;
            case 'about' :
                component = <About.Content/>;
                break;
        }
        return component;
    };

    render() {
        return(
            <div className="Content-Container">
                <Description config={this.config}/>
                {this.getComponent()}
            </div>
        );
    }
}

export default function Main({config}) {

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <Navigation/>
                <ContentContainer config={config}/>
            </div>
        </div>
    )
};
