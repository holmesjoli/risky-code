import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Model from "../../components/Model";
import { ActualPredicted } from "../../components/Legend";
import Card from "../../components/Card";
import { Regression, PredictiveOutcomes } from "../../components/Regression";
import { Terminology, Term } from '../../components/Terminology';
import { terms } from '../../utils/global';
import Overlay from "../../components/Overlay";
import Progress from "../../components/Progress";
import { BackButton, NextButton } from '../../components/Button';
import SortLaundry from "../../components/SortLaundry";

function Information({items, variables}) {
    return (
        <div>
            <ActualPredicted/>
            <PredictiveOutcomes/>
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

export default function Train({config, variables, setVariables, items, setItems, modules}) {

    const [id, setId] = useState("predict");
    const [isOpen, setIsOpen] = useState(true);
    const [nClassified, setNClassified] = useState(0);

    let navigate = useNavigate();
    const routeNext = () => {
      let path = `/Optimize`; 
      navigate(path);
    }

    const routeBack = () => {
      let path = `/Introduction`; 
      navigate(path);
    }

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setId(isOpen ? "predict": "train");
    }, [isOpen])

    return (
        <div className="App">
            {
                isOpen ?
                <Overlay isOpen={isOpen} onClose={toggleOverlay}>
                <div className="Containers-Container">
                    <div className="Container-Fill-Secondary">
                        <div className="Overlay-Controls">
                            <h3 className="Page-Title">introduction to predictive algorithms</h3>
                            <button
                                className="Overlay-Close"
                                type="button"
                                onClick={toggleOverlay}
                            />
                        </div>
                        <p>In this module, we will build a simple predictive algorithm to demonstrate how predictive modeling works. Simply, an algorithm is a series of steps that allow you to perform a particular task. One analogy here is laundry. You have an sorting algorithm for how laundry items get classified.</p>
                        <p>One variable in this algorithm is probably color. But variables such as type of machine load (e.g. regular wash, dry clean only), pastel, or print could impact your laundry sorting algorithm. And what do you do with gray clothes anyway?</p>
                        <div>
                            <h3>sort each item into the correct category</h3>
                            <SortLaundry items={items} setItems={setItems} nClassified={nClassified} setNClassified={setNClassified}/>
                        </div>
                    </div>
                </div>
            </Overlay>:
            <></>
            }
            <Header/>
            <div className="Main">
                <div className="Sidebar-Left">
                    <Description config={config}/>
                    <Terminology>
                        <Term term={terms['algorithm']}/>
                        <Term term={terms['stat-model']}/>
                        <Term term={terms['data-variable']}/>
                        <Term term={terms['model-variable']}/>
                    </Terminology>
                    <BackButton routeBack={routeBack}/>
                </div>
                <Content variables={variables} setVariables={setVariables} items={items} setItems={setItems}/>
                <div className="Sidebar-Right">
                    <Progress id={id} modules={modules}/>
                    <NextButton routeNext={routeNext}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
