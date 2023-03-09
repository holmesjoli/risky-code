import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Terminology, Term } from '../../components/Terminology';
import { terms } from '../../utils/global';
import Overlay from "../../components/Overlay";
import Progress from "../../components/Progress";
import { BackButton, NextButton, NextButtonOverlay } from '../../components/Button';
import SortLaundry from "../../components/SortLaundry";
import { LeftSideBar, RightSideBar } from "../../components/Sidebar";
import Timer from "../../components/Timer";
import { TextField } from "@material-ui/core";

function Stakeholders() {
    return(
        <div className="Stakeholders Container-Outlined">
            <h3>stakeholders</h3>
            <div className="Column Margin-Bottom">
                <h4>primary</h4>
                <TextField placeholder="edit me" variant="outlined" multiline={true}/>
            </div>
            <div className="Column Margin-Bottom">
                <h4>secondary</h4>
                <TextField placeholder="edit me" variant="outlined" multiline={true}/>
            </div>
            <div className="Column Margin-Bottom">
                <h4>tertiary</h4>
                <TextField placeholder="edit me" variant="outlined" multiline={true}/>
            </div>
        </div>
    )
}

export function Content({items, setItems, nClassified, setNClassified, setDisabled}) {

    return(
        <div className="Content No-Padding-Top">
            <SortLaundry items={items} setItems={setItems} nClassified={nClassified} setNClassified={setNClassified} setDisabled={setDisabled}/>
        </div>
    )
}

export default function Classify({config, user, disablePredictionNext, setDisablePredictionNext, items, setItems, modules}) {

    const [id, setId] = useState("predict");
    const [isOpen, setIsOpen] = useState(true);
    const [nClassified, setNClassified] = useState(0);
    const [disabled, setDisabled] = useState(true);

    let navigate = useNavigate();

    const routeNext = () => {
      let path = `/Train`; 
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
        setId(isOpen ? "predict": "classify");
    }, [isOpen])

    return (
        <div className="App">
            {isOpen ?
                <Overlay isOpen={isOpen} onClose={toggleOverlay}>
                <div className="Containers-Container">
                    <div className="Container-Fill-Secondary">
                        <div className="Two-Column-Three">
                            <div>
                                <h3 className="Page-Title">introduction to predictive algorithms</h3>
                                <div className="Card-Group">
                                    <h4>what's in an algorithm?</h4>
                                    <TextField placeholder="edit me" variant="outlined" multiline={true} row={10}/>
                                </div>
                            </div>
                            <RightSideBar>
                                <div className="Card-Group">
                                    <h4>algorithmically informed decision-making</h4>
                                    <p className="Small-Margin">This research defines algorithmically informed decision making as <span className="Emphasis">a system that uses automated reasoning to aid or replace a decision-making process that would otherwise be performed by humans <NavLink to="/Resources">(AINOW 2018)</NavLink></span></p>
                                </div>
                                <Timer user={user} disableNext={disablePredictionNext} setDisableNext={setDisablePredictionNext}>
                                    <p>How do you define the term algorithm?</p>
                                    <p>Brainstorm multiple examples of algorithms in use in your life.</p>
                                </Timer>
                                {toggleOverlay? <NextButtonOverlay disabled={disablePredictionNext} toggleOverlay={toggleOverlay}/>: <></>}
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
                    <Description config={config}/>
                    <Terminology margin="Margin-Large-Bottom">
                        <Term term={terms['algorithm']}/>
                        <Term term={terms['data-variable']}/>
                        <Term term={terms['model-variable']}/>
                    </Terminology>
                    <BackButton routeBack={routeBack}/>
                </LeftSideBar>
                <Content items={items} setItems={setItems} nClassified={nClassified} setNClassified={setNClassified} setDisabled={setDisabled}/>
                <RightSideBar>
                    <Progress id={id} modules={modules}/>
                    <NextButton routeNext={routeNext} disabled={disabled}/>
                </RightSideBar>
            </div>
            <Footer/>
        </div>
    )
}
