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
import { BackButton, NextButton, NextButtonOverlay } from '../../components/Button';
import SortLaundry from "../../components/SortLaundry";
import { LeftSideBar, RightSideBar } from "../../components/Sidebar";

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
        <div className="Content No-Padding-Top">
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
                        <SortLaundry items={items} setItems={setItems} nClassified={nClassified} setNClassified={setNClassified} toggleOverlay={toggleOverlay}/>                      
                    </div>
                </div>
            </Overlay>:
            <></>
            }
            <Header/>
            <div className="Main">
                <LeftSideBar>
                    <Description config={config}/>
                    <Terminology margin="Margin-Large-Bottom">
                        <Term term={terms['algorithm']}/>
                        <Term term={terms['data-variable']}/>
                        <Term term={terms['model-variable']}/>
                    </Terminology>
                    <BackButton routeBack={routeBack}/>
                </LeftSideBar>
                <Content variables={variables} setVariables={setVariables} items={items} setItems={setItems}/>
                <RightSideBar>
                    <Progress id={id} modules={modules}/>
                    <NextButton routeNext={routeNext}/>
                </RightSideBar>
            </div>
            <Footer/>
        </div>
    )
}
