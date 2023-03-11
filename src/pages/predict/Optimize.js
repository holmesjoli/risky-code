import React, { useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Progress from "../../components/Progress";
import Overlay from "../../components/Overlay";
import Card from "../../components/Card";
import Model from "../../components/Model";
import { terms } from '../../utils/global';
import { BackButton, NextButton, NextButtonOverlay } from '../../components/Button';
import { Regression, Accuracy, PredictiveOutcomes } from "../../components/Regression";
import { ActualPredicted } from "../../components/Legend";
import { LeftSideBar, RightSideBar, Description, Terminology, Term } from "../../components/Sidebar";
import Timer from "../../components/Timer";

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
        <div className="Content No-Padding-Top">
            <div>
                <h3>experience</h3>
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

export default function Optimize({config, user, variables, setVariables, items, setItems, modules, disablePredictionNext2, setDisablePredictionNext2}) {

    const [isOpen, setIsOpen] = useState(false);

    let navigate = useNavigate(); 
    const routeNext = () => {
      let path = `/Calibration`; 
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
                                <h4>what's in an algorithm?</h4>
                            </div>
                        </div>
                        <RightSideBar>
                            <div className="Card-Group">
                                <h4>algorithmically informed decision-making</h4>
                                <p>This research defines algorithmically informed decision making as <span className="Emphasis">a system that uses automated reasoning to aid or replace a decision-making process that would otherwise be performed by humans <NavLink to="/Resources">(AINOW 2018)</NavLink></span></p>
                                <p className="No-Margin-Bottom">Algorithmically informed decision-making is often also called algorithmic or automated decision-making. The term algorithmic decision-making has been modified in this research to include the word <span className="Emphasis">informed</span> in recognition of the reality that most automated systems are only semi-automatic and have some level of human interaction and oversight.</p>
                            </div>
                            <Timer user={user} disableNext={disablePredictionNext2} setDisableNext={setDisablePredictionNext2}>
                                <p>How do you define the term algorithm?</p>
                                <p>Brainstorm multiple examples of algorithms in use in your life.</p>
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
                        <p>In this step of algorithm building, we will optimize the Laundry AID to be as accurate as possible. Convert the probability into a prediction by applying a threshold. Move the slider to adjust the threshold to maximize accuracy</p>
                    </Description>
                    <Terminology>
                        <Term term={terms['algorithm']}/>
                        <Term term={terms['accuracy']}/>
                    </Terminology>
                    <BackButton routeBack={routeBack}/>
                </LeftSideBar>
                <Content variables={variables} setVariables={setVariables} items={items} setItems={setItems}/>
                <RightSideBar>
                    <Progress id={config.id} modules={modules}/>
                    <NextButton routeNext={toggleOverlay}/>
                </RightSideBar>
            </div>
            <Footer/>
        </div>
    )
}
