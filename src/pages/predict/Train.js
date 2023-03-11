import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Model from "../../components/Model";
import { ActualPredicted } from "../../components/Legend";
import Card from "../../components/Card";
import { Regression, PredictiveOutcomes } from "../../components/Regression";
import { terms } from '../../utils/global';
import Progress from "../../components/Progress";
import { BackButton, NextButton } from '../../components/Button';
import { LeftSideBar, RightSideBar, Description, Terminology, Term } from "../../components/Sidebar";

function Information() {
    return (
        <div>
            <ActualPredicted/>
            <PredictiveOutcomes/>
        </div>
    )
}

export function Content({variables, setVariables, items, setItems}) {

    return(
        <div className="Content No-Padding-Top">
            <div>
                <h3>experiment</h3>
                <div className="Three-Column">
                    <Model variables={variables} setVariables={setVariables}/>
                    <Regression items={items} setItems={setItems} variables={variables}/>
                    <Card items={items} variables={variables}/>
                    <Information items={items} variables={variables}/>
                </div>
            </div>
        </div>
    )
}

export default function Train({config, variables, setVariables, items, setItems, modules}) {

    let navigate = useNavigate();
    const routeNext = () => {
      let path = `/Optimize`; 
      navigate(path);
    }

    const routeBack = () => {
      let path = `/Classify`; 
      navigate(path);
    }

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <LeftSideBar>
                    <Description config={config}>
                        <p>On this page, we will train a predictive model, Laundry AID (Algorithmically Informed Decision), to guess if an item should belong in the hot water load according to your classification.</p>
                        <p>A predictive model is a computational interpretation of an algorithm's rules.</p>
                        <p>To train Laundry AID, drag one or more data variables from the variable list to the model list. This will automatically run a statistical model to predict the results. Add or remove variables from the model to see how the predictive probabilities change.</p>
                    </Description>
                    <Terminology margin="Margin-Large-Bottom">
                        <Term term={terms['algorithm']}/>
                        <Term term={terms['data-variable']}/>
                        <Term term={terms['model-variable']}/>
                        <Term term={terms['predictive-model']}/>
                        <Term term={terms['predictive-probability']}/>
                    </Terminology>
                    <BackButton routeBack={routeBack}/>
                </LeftSideBar>
                <Content variables={variables} setVariables={setVariables} items={items} setItems={setItems}/>
                <RightSideBar>
                    <Progress id={config.id} modules={modules}/>
                    <NextButton routeNext={routeNext}/>
                </RightSideBar>
            </div>
            <Footer/>
        </div>
    )
}
