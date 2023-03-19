import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Progress from "../../components/Progress";
import Overlay from "../../components/Overlay";
import Card from "../../components/Card";
import Model from "../../components/Model";
import { terms } from '../../utils/global';
import { BackButton, NextButton, NextButtonOverlay } from '../../components/Button';
import { Regression, Accuracy, PredictiveOutcomes, Threshold } from "../../components/Regression";
import { ActualPredicted, Predicted } from "../../components/Legend";
import { LeftSideBar, RightSideBar, Description, Terminology, Term } from "../../components/Sidebar";

import { RoleShort } from "../../components/Role";
import MiniModel from "../../components/MiniAccuracyModel";

function Information({items, variables, predictiveProbability}) {
    return (
        <div className="Three-Column2 Margin-Top">
            <ActualPredicted/>
            <PredictiveOutcomes/>
            <Accuracy items={items} variables={variables} predictiveProbability={predictiveProbability}/>
        </div>
    )
}

export function Content({variables, setVariables, items, setItems, predictiveProbability, updateSlider}) {

    return(
        <div className="Content No-Padding-Top">
            <div>
                <h3 className="Small-Margin">interact</h3>
                <div className="One-Column-Three2">
                    <div>
                        <Threshold predictiveProbability={predictiveProbability} updateSlider={updateSlider}/>
                        <Model variables={variables} setVariables={setVariables}/>
                    </div>
                    <div>
                        <Regression items={items} setItems={setItems} variables={variables}/>
                        <Card items={items} variables={variables} addIncorrect={false}/>
                        <Information items={items} variables={variables} predictiveProbability={predictiveProbability}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Optimize({config, variables, setVariables, items, setItems, modules}) {

    const [isOpen, setIsOpen] = useState(true);
    const [predictiveProbability, setPredictiveProbability] = useState(50);

    const updateSlider = (event, value) => {
        setPredictiveProbability(value)
    };

    let navigate = useNavigate(); 
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

    return (
        <div className="App">
            {isOpen ?
            <Overlay isOpen={isOpen} onClose={toggleOverlay}>
            <div className="Containers-Container">
                <div className="Container-Fill-Secondary">
                    <h3 className="Page-Title Small-Margin">algorithmic prediction | optimize</h3>
                    <div className="Two-Column-Three">
                        <MiniModel/>
                        <RightSideBar>
                            <div className="Container2">
                                <h3>learn</h3>
                                <p>The third step of algorithmic prediction is to <span className="Semi-Bold">optimize</span> a predictive model. Optimizing a model normally means making a predictive model as accurate as possible.</p>
                                <p>First, convert the probability into a prediction by applying a threshold. Move the slider to adjust the threshold to maximize accuracy.</p>
                                <p className="Padding-Bottom No-Margin-Bottom Bottom-Rule">Use, the slider to adjust the threshold. Notice, how the prediction of belonging to the cold water load changes for each item and the overall model accuracy changes.</p>
                                <Predicted/>
                            </div>
                            <NextButtonOverlay toggleOverlay={toggleOverlay}/>
                        </RightSideBar>
                    </div>
                </div>
            </div>
        </Overlay>:
        <></>
        }
            
            {/* {isOpen ?
            <Overlay isOpen={isOpen} onClose={toggleOverlay}>
            <div className="Containers-Container">
                <div className="Container-Fill-Secondary">
                    <div className="Two-Column-Three">
                        <div>
                            <h3 className="Page-Title">reflect</h3>
                            <div className="Card-Group">
                                <h4>algorithm rules</h4>
                                <p>{rules.rule1}</p>
                                <p>{rules.rule2}</p>
                                <p>{rules.rule3}</p>
                            </div>
                            <AlgorithmDefinition algorithmDefinition={algorithmDefinition} setAlgorithmDefinition={setAlgorithmDefinition}>
                                <p>Would you make any updates to your definition of an algorithm?</p>
                            </AlgorithmDefinition>
                        </div>
                        <RightSideBar>
                            <Timer user={user} disableNext={disablePredictionNext2} setDisableNext={setDisablePredictionNext2}>
                                <p>Would you collect any other variables to use in the statistical model?</p>
                                <p>Were there any rules that didn't fit the statistical model was not able to accomodate?</p>
                                {user==="group"? <p>Were there any rules that one person uses to sort their laundry that are not used by others?</p>: <></>}
                                <p>What are the consequences of when Laundry AID made an incorrect prediction?</p>
                            </Timer>
                            {toggleOverlay? <NextButtonOverlay disabled={disablePredictionNext2} toggleOverlay={routeNext}/>: <></>}
                        </RightSideBar>
                    </div>
                </div>
            </div>
        </Overlay>:
        <></>
        } */}
        <Header/>
            <div className="Main">
                <LeftSideBar>
                    <Description config={config}>
                    </Description>
                    <RoleShort moduleName="prediction"/>
                    <Terminology margin="Margin-Large-Bottom">
                        <Term term={terms['accuracy']}/>
                        <Term term={terms['algorithm']}/>
                        <Term term={terms['decision-threshold']}/>
                    </Terminology>
                    <BackButton routeBack={routeBack}/>
                </LeftSideBar>
                <Content variables={variables} setVariables={setVariables} items={items} setItems={setItems} predictiveProbability={predictiveProbability} updateSlider={updateSlider}/>
                <RightSideBar>
                    <Progress id={config.id} modules={modules}/>
                    <NextButton routeNext={routeNext}/>
                </RightSideBar>
            </div>
            <Footer/>
        </div>
    )
}
