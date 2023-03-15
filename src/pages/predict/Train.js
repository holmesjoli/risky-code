import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Model from "../../components/Model";
import { Actual } from "../../components/Legend";
import Card from "../../components/Card";
import { Regression, PredictiveOutcomes } from "../../components/Regression";
import { terms } from '../../utils/global';
import Progress from "../../components/Progress";
import { BackButton, NextButton, NextButtonOverlay } from '../../components/Button';
import { LeftSideBar, RightSideBar, Description, Terminology, Term, Role, RoleAccordion } from "../../components/Sidebar";
import Overlay from "../../components/Overlay";

function Information() {
    return (
        <div>
            <Actual/>
            <PredictiveOutcomes/>
        </div>
    )
}

export function Content({variables, setVariables, items, setItems}) {

    return(
        <div className="Content No-Padding-Top">
            <div>
                <h3 className="Small-Margin">interact</h3>
                <div className="Three-Column">
                    <Model variables={variables} setVariables={setVariables}/>
                    <Regression items={items} setItems={setItems} variables={variables}/>
                    <Card items={items} variables={variables} addIncorrect={false}/>
                    <Information items={items} variables={variables}/>
                </div>
            </div>
        </div>
    )
}

export default function Train({config, variables, setVariables, items, setItems, modules, rules}) {

    const [isOpen, setIsOpen] = useState(true);

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
            {isOpen ?
            <Overlay isOpen={isOpen} onClose={toggleOverlay}>
            <div className="Containers-Container">
                <div className="Container-Fill-Secondary">
                    <div className="Two-Column-Three">
                        <div>
                            <div className="Card-Group">
                                <p>Wow that took you awhile! Approximately 5 minutes and 21 seconds, seems like there is a more efficient way to do this.</p>
                                <p>My friend told me about a new techology called Laundry AID (algorithmically informed decision-making) which automates the laundry sorting process.</p>
                                <p>Laundry AID needs to be trained to your laundry preferences, but its easy to do! Once you set-up Laundry AID, you'll never have to sort laundry again.</p>
                            </div>
                            {toggleOverlay? <NextButtonOverlay toggleOverlay={toggleOverlay} label={"try laundry aid"}/>: <></>}
                        </div>
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
                    <p>On this page, we will train a predictive model, Laundry AID, to guess if an item should belong in the hot water load according to your classification.</p>
                    <p>A predictive model is a computational interpretation of an algorithm's rules. Here are the rules you defined in the last module:</p>
                    <ul className="Margin-Bottom">
                        <li className="Emphasis">{rules.rule1}</li>
                        <li className="Emphasis">{rules.rule2}</li>
                        <li className="Emphasis">{rules.rule3}</li>
                    </ul>
                    <p>To train Laundry AID, drag one or more data variables from the variable list to the model list. This will automatically run a statistical model to predict the results.</p>
                    <p>Add or remove variables from the model to see how the predictive probabilities change.</p>
                </Description>
                <Role moduleName="prediction" addTitle={false}/>
                <Terminology margin="Margin-Large-Bottom">
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
                <Progress id={config.id} modules={modules}/>
                <NextButton routeNext={routeNext}/>
            </RightSideBar>
        </div>
        <Footer/>
    </div>
    )
}
