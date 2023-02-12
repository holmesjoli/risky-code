import React from 'react';
import Navigation from './Navigation';
import Description from "./Description";
import Header from './Header';
import Footer from './Footer';
import * as About from "../pages/About";
import * as Glossary from "../pages/Glossary";
import * as Introduction from "../pages/Introduction";
import * as Calibration from "../pages/fairness/Calibration";
import * as FalsePositive from "../pages/fairness/FalsePositive";
import * as FalseNegative from "../pages/fairness/FalseNegative";
import * as Compas from "../pages/fairness/COMPAS";
import * as DecisionAid from "../pages/deliberation/DecisionAid";
import * as RiskFramework from "../pages/deliberation/RiskFramework";
import * as StakeholderMapping from "../pages/deliberation/Stakeholders";

function GetComponent({config}) {
    let component;

    switch (config.id) {
        default:
            component = <Introduction.Content/>
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
        case 'about' :
            component = <About.Content/>;
            break;
    }

    return component;
};

export default function Main({config}) {

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <div className="Sidebar">
                    <Navigation/>
                    <Description config={config}/>
                </div>
                <GetComponent config={config}/>
            </div>
            <Footer/>
        </div>
    )
};
