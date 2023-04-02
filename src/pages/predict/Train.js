import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Model from "../../components/Model";
import { Actual } from "../../components/Legend";
import { updateCard, Card } from '../../components/Card'; 
import { runRegression, PredictiveOutcomes, LaundryItemPredicted } from "../../components/Regression";
import { terms, VARIABLES } from '../../utils/global';
import Progress from "../../components/Progress";
import { BackButton, NextButton, NextButtonOverlay } from '../../components/Button';
import { LeftSideBar, RightSideBar, Description, Terminology, Term } from "../../components/Sidebar";
import { RoleShort } from "../../components/Role";
import Overlay from "../../components/Overlay";
import MiniModel from "../../components/MiniStatisticalModel";

function Information() {
    return (
        <div className="Two-Column Margin-Top">
            <PredictiveOutcomes/>
        </div>
    )
}

export function Content({variables, setVariables, items, setItems}) {

    useEffect(() => {
            runRegression(variables, items, setItems);
            updateCard(items, variables);
    }, [variables, items]);

    return(
        <div className="Content No-Padding-Top">
            <div className="One-Column-Three5">
                <div>
                    <div className=''>
                        {/* <h3 className="Small-Margin">interact</h3> */}
                        <div>
                            <Model variables={variables} setVariables={setVariables}/>
                        </div>
                    </div>
                </div>
                <div className="">
                    {/* <h3 className="Small-Margin">visualize</h3> */}
                    <Card items={items}/>
                    <Information items={items} variables={variables}/>
                </div>
            </div>
        </div>
    )
}

export default function Train({config, user, variables, setVariables, items, setItems, modules, rules}) {

    const [isOpen, setIsOpen] = useState(true);
    const [variablesMini, setVariablesMini] = useState(VARIABLES);

    let navigate = useNavigate();
    const routeNext = () => {
      let path = `/Optimize`; 
      navigate(path);
    };

    const routeBack = () => {
      let path = `/Classify`; 
      navigate(path);
    };

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="App">
            {/* {isOpen ?
            <Overlay isOpen={isOpen} onClose={toggleOverlay}>
            <div className="Containers-Container">
                <div className="Container-Fill-Secondary">
                    <h3 className="Page-Title Small-Margin">introduction to algorithmic training</h3>
                    <div className="Two-Column-Three">
                        <div className="Two-Column">
                            <MiniModel variablesMini={variablesMini} setVariablesMini={setVariablesMini}/>
                            <LaundryItemPredicted variablesMini={variablesMini} className="Container2"/>
                        </div>
                        <RightSideBar>
                            <div className="Container2">
                                <h4 className="Small-Margin">learn</h4>
                                <p>The second step of algorithmic prediction is to <span className="Semi-Bold">train</span> a predictive model. A predictive model is a computational interpretation of an algorithm's rules.</p>
                                <p>We will train a predictive model called Laundry AID. It will guess if an item belongs in the cold water load according to your rules from the last module.</p>
                                <ul className="Margin-Bottom">
                                    <li>{rules.rule1}</li>
                                    <li>{rules.rule2}</li>
                                    <li>{rules.rule3}</li>
                                </ul>
                                <p>Test how you will train Laundry AID by dragging one or more <span className="Emphasis">data variables</span> to <span className="Emphasis">model variables</span>.</p>
                                <p className="No-Margin-Bottom">Notice that the outcome variable, <span className="Emphasis">cold water load</span> is fixed and cannot be changed.</p>
                            </div>
                            <NextButtonOverlay toggleOverlay={toggleOverlay} className="Purple"/>
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
                <Description title={config.title}>
                    {/* <p>To train Laundry AID, drag one or more variables from data variables to model variables. This will automatically run a statistical model to predict the results. Add or remove variables from the model to see how the predictive probabilities change.</p>
                    <p>Laundry rules:</p>
                    <ul className="Margin-Bottom">
                        <li>{rules.rule1}</li>
                        <li>{rules.rule2}</li>
                        <li>{rules.rule3}</li>
                    </ul>*/}
                    <p>The second step of algorithmic prediction is to <span className="Semi-Bold">train</span> a predictive model. A predictive model is a computational interpretation of an algorithm's rules.</p>
                                <p>We will train a predictive model called Laundry AID. It will guess if an item belongs in the cold water load according to your rules from the last module.</p>
                                <ul className="Margin-Bottom">
                                    <li>{rules.rule1}</li>
                                    <li>{rules.rule2}</li>
                                    <li>{rules.rule3}</li>
                                </ul>
                                <p>Test how you will train Laundry AID by dragging one or more <span className="Emphasis">data variables</span> to <span className="Emphasis">model variables</span>.</p>
                                <p>Notice that the outcome variable, <span className="Emphasis">cold water load</span> is fixed and cannot be changed.</p>
                </Description>
                <RoleShort moduleName="prediction"/>
                <Terminology margin="Margin-Large-Bottom" className="Purple">
                    <Term term={terms['algorithm']}/>
                    <Term term={terms['data-variable']}/>
                    <Term term={terms['model-variable']}/>
                    <Term term={terms['outcome-variable']}/>
                    <Term term={terms['predictive-model']}/>
                    <Term term={terms['predictive-probability']}/>
                </Terminology>
                <BackButton routeBack={routeBack}/>
            </LeftSideBar>
            <Content variables={variables} setVariables={setVariables} items={items} setItems={setItems}/>
            <RightSideBar>
                <Progress id={config.id} modules={modules} className="Purple"/>
                <NextButton routeNext={routeNext} className="Purple"/>
            </RightSideBar>
        </div>
        <Footer/>
    </div>
    )
}
