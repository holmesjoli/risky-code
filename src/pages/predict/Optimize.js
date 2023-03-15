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
import { ActualPredicted } from "../../components/Legend";
import { LeftSideBar, RightSideBar, Description, Terminology, Term, RoleAccordion } from "../../components/Sidebar";
import Timer from "../../components/Timer";
import { AlgorithmDefinition } from '../../components/TrackUserInputs';

function Information({items, variables}) {
    return (
        <div>
            <ActualPredicted/>
            <PredictiveOutcomes/>
            <Accuracy items={items} variables={variables}/>
        </div>
    )
}

export function Content({variables, setVariables, items, setItems, predictiveProbability, updateSlider}) {

    return(
        <div className="Content No-Padding-Top">
            <div>
                <h3 className="Small-Margin">interact</h3>
                <div className="Three-Column">
                    <div>
                        <Threshold predictiveProbability={predictiveProbability} updateSlider={updateSlider}/>
                        <Model variables={variables} setVariables={setVariables} />
                    </div>
                    <Regression items={items} setItems={setItems} variables={variables} predictiveProbability={predictiveProbability}/>
                    <Card items={items} variables={variables} addIncorrect={true} predictiveProbability={predictiveProbability}/>
                    <Information items={items} variables={variables}/>
                </div>
            </div>
        </div>
    )
}

export default function Optimize({config, user, variables, setVariables, items, setItems, modules, disablePredictionNext2, setDisablePredictionNext2, algorithmDefinition, setAlgorithmDefinition, rules}) {

    const [isOpen, setIsOpen] = useState(false);
    const [predictiveProbability, setPredictiveProbability] = useState(50);

    const updateSlider = (event, value) => {
        setPredictiveProbability(value)
    };

    let navigate = useNavigate(); 
    const routeNext = () => {
      let path = `/COMPAS`; 
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
        <div className="App">{isOpen ?
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
        }
        <Header/>
            <div className="Main">
                <LeftSideBar>
                    <Description config={config}>
                        <p>This page builds on the statistical model explored in the previous page, <span className="Emphasis">Train</span>.</p>
                        <p>In this step of algorithm building, we will optimize the Laundry AID to be as accurate as possible. Convert the probability into a prediction by applying a threshold. Move the slider to adjust the threshold to maximize accuracy</p>
                    </Description>
                    <RoleAccordion moduleName="prediction"/>
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
                    <NextButton routeNext={toggleOverlay}/>
                </RightSideBar>
            </div>
            <Footer/>
        </div>
    )
}
