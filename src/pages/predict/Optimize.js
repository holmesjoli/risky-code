import React, {  useState } from 'react';
import { useNavigate } from "react-router-dom";
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Progress from "../../components/Progress";
import { Terminology, Term } from '../../components/Terminology';
import { terms } from '../../utils/global';
import { BackButton, NextButton } from '../../components/Button';
import Card from "../../components/Card";
import { Regression, Accuracy, PredictiveOutcomes } from "../../components/Regression";
import { ActualPredicted } from "../../components/Legend";
import Model from "../../components/Model";

function Information({items, variables}) {
    return (
        <div>
            <ActualPredicted/>
            <PredictiveOutcomes/>
            <Accuracy items={items} variables={variables}/>
        </div>
    )
}

export function Content({variables, setVariables, items, setItems}) {

    return(
        <div className="Content">
            <div className="Three-Column">
                <Model variables={variables} setVariables={setVariables}/>
                <Regression items={items} setItems={setItems} variables={variables}/>
                <Card items={items} variables={variables}/>
                <Information items={items} variables={variables}/>
            </div>
        </div>
    )
}


export default function Optimize({config, variables, setVariables, items, setItems, modules}) {

    let navigate = useNavigate(); 
    const routeNext = () => {
      let path = `/Calibration`; 
      navigate(path);
    }

    const routeBack = () => {
      let path = `/Train`; 
      navigate(path);
    }

    return (
        <div className="App">
        <Header/>
            <div className="Main">
                <div className="Sidebar-Left">
                    <Description config={config}/>
                    <Terminology>
                        <Term term={terms['accuracy']}/>
                        <Term term={terms['stat-model']}/>
                    </Terminology>
                    <BackButton routeBack={routeBack}/>
                </div>
                <Content variables={variables} setVariables={setVariables} items={items} setItems={setItems}/>
                <div className="Sidebar-Right">
                    <Progress id={config.id} modules={modules}/>
                    <NextButton routeNext={routeNext}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
