import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Progress from "../../components/Progress";
import Overlay from "../../components/Overlay";
import { updateCard, Card } from "../../components/Card";
import Model from "../../components/Model";
import { terms } from '../../utils/global';
import { BackButton, NextButton, NextButtonOverlay } from '../../components/Button';
import { runRegression, updateAccuracy, Accuracy, PredictiveOutcomes, Threshold } from "../../components/Regression";
import { Predicted } from "../../components/Legend";
import { LeftSideBar, RightSideBar, Description, Terminology, Term } from "../../components/Sidebar";

import { RoleShort } from "../../components/Role";
import MiniModel from "../../components/MiniAccuracyModel";

function AccuracyDefinition() {

    return(
        <div>
            <div className="Container2">
                <h4 className="Small-Margin">model accuracy</h4>
                <p className="No-Margin-Bottom"> Accuracy is a percent of how many predicted values match the actual values. In this example, the accuracy is either 0 or 100%, because there is only one item.</p>
                <h5 className="Accuracy-Percent Small-Margin No-Margin-Top No-Margin-Bottom Semi-Bold White Opacity1"></h5>
            </div>
        </div>
    )
}

function Information() {
    return (
        <div className="Three-Column2 Margin-Top">
            <Predicted className="Container"/>
            <PredictiveOutcomes/>
            <Accuracy />
        </div>
    )
}

export function Content({variables, setVariables, items, setItems, predictiveProbability, updateSlider, modules}) {

    return(
        <div className="Content No-Padding-Top">
            <div className="One-Column-Three5">
                <div>
                    <Model variables={variables} setVariables={setVariables}/>
                    <Threshold predictiveProbability={predictiveProbability} updateSlider={updateSlider}/>
                </div>
                <div>
                    <Card items={items}/>
                    <Information/>
                </div>
            </div>
        </div>
    )
}

export default function Optimize({config, variables, setVariables, items, setItems, modules, state, remaining}) {

    const [isOpen, setIsOpen] = useState(true);
    const [predictiveProbability, setPredictiveProbability] = useState(50);

    const updateSlider = (event, value) => {
        setPredictiveProbability(value)
    };

    let navigate = useNavigate(); 

    useEffect(() => {
        if (remaining === 0) {
            let path = `/`;
            navigate(path);
        }
    }, [state, remaining])

    const routeNext = () => {
      let path = `/PredictionReflection`; 
      navigate(path);
    }

    const routeBack = () => {
      let path = `/Train`; 
      navigate(path);
    }

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        runRegression(items, setItems, variables, predictiveProbability/100);
        updateCard(items, variables, true);
        updateAccuracy(items, variables)
    }, [variables, items, predictiveProbability]);

    return (
        <div className="App">
            {isOpen ?
            <Overlay isOpen={isOpen} onClose={toggleOverlay}>
            <div className="Containers-Container">
                <div className="Container-Fill-Secondary">
                    <h3 className="Page-Title">algorithmic optimization</h3>
                    <div className="Two-Column-Three">
                        <div>
                            <MiniModel/>
                        </div>
                        <RightSideBar>
                            <div className="Container2 Margin-Bottom">
                                <h4 className="Small-Margin">learn</h4>
                                <p>The third step of algorithmic prediction is to <span className="Semi-Bold">optimize</span> a predictive model. Optimizing a model normally means making a predictive model as accurate as possible.</p>
                                <p>First, convert the probability into a prediction by applying a threshold. Move the slider to adjust the threshold to maximize accuracy.</p>
                                <p className="No-Margin-Bottom">Use the slider to adjust the threshold. Notice, how the prediction of belonging to the cold water load changes for each item and the overall model accuracy changes.</p>
                            </div>
                            <AccuracyDefinition />
                            <NextButtonOverlay className="Purple" toggleOverlay={toggleOverlay}/>
                        </RightSideBar>
                    </div>
                </div>
            </div>
        </Overlay>:
        <></>
        }
        <Header/>
            <div className="Main">
                <LeftSideBar>
                    <Description title={config.title} id={config.id} modules={modules}>
                        <p>Optimize Laundry AID by adjusting the slider and adding or removing model variables.</p>
                        <p className="Padding-Bottom No-Margin-Bottom">Try to get the accuracy as high as possible.</p>
                    </Description>
                    <div className="Margin-Bottom Bottom-Rule Padding-Bottom">
                        <h3>Navigation</h3>
                        <NextButton routeNext={routeNext} className="Purple"/>
                        <div className="Button-Container-Right">
                            <BackButton routeBack={routeBack}/>
                            <Progress id={config.id} modules={modules} className="Purple"/>
                        </div>
                    </div>
                    <h3>Additional Information</h3>
                    <RoleShort moduleName="prediction"/>
                    <Terminology margin="Margin-Large-Bottom" className="Purple">
                        <Term term={terms['accuracy']}/>
                        <Term term={terms['algorithm']}/>
                        <Term term={terms['decision-threshold']}/>
                    </Terminology>
                </LeftSideBar>
                <Content variables={variables} setVariables={setVariables} items={items} setItems={setItems} predictiveProbability={predictiveProbability} updateSlider={updateSlider} modules={modules}/>
            </div>
            <Footer/>
        </div>
    )
}
