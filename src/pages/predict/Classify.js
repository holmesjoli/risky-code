import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Progress from "../../components/Progress";
import { BackButton, NextButton, NextButtonOverlay } from '../../components/Button';
import SortLaundry from "../../components/SortLaundry";
import { LeftSideBar, RightSideBar, Description, Terminology, Term } from "../../components/Sidebar";
import { terms } from "../../utils/global";
import { RoleShort } from "../../components/Role";
import { Overlay } from "../../components/Overlay";
import MiniModel from '../../components/MiniLaundryModel';

export function Content({items, setItems, nClassified, setNClassified, setDisabled}) {

    return(
        <div className="Content No-Padding-Top">
            <div className="">
                <SortLaundry items={items} setItems={setItems} nClassified={nClassified} setNClassified={setNClassified} setDisabled={setDisabled}/>
            </div>
        </div>
    )
}

export default function Classify({config, user, items, setItems, modules, rules, setRules, name}) {

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
      let path = `/Prediction`; 
      navigate(path);
    }

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setId(isOpen ? "predict": "classify");
    }, [isOpen]);

    return (
        <div className="App"> {
            isOpen ?
            <Overlay isOpen={isOpen} onClose={toggleOverlay}>
            <div className="Containers-Container">
                <div className="Container-Fill-Secondary No-Padding-Right">
                    <h3 className="Page-Title Small-Margin">algorithmic prediction | classify</h3>
                    <div className="Two-Column-Three">
                        <MiniModel/>
                        <RightSideBar>
                            {/* <Role moduleName="prediction" user={user}/> */}
                            <div className="Container2">
                                <h4 className="Small-Margin">learn</h4>
                                <p>The first step of algorithmic prediction is to collect and classify data. The <span className="Emphasis">Algorithmic Prediction</span> module continues to build on the laundry analogy introduced in the orientation.</p>
                                {user==="group"?<p className="Margin-Small">Your team will classify <span className="Semi-Bold">20</span> items of clothing using the rules you previously defined.</p>: <p className="Margin-Small">You will classify 20 items of clothing using the rules you previously defined.</p>}
                                <ul className="Margin-Bottom">
                                    <li>{rules.rule1}</li>
                                    <li>{rules.rule2}</li>
                                    <li>{rules.rule3}</li>
                                </ul>

                                {user==="group"?<p className="No-Margin-Bottom">Discuss how to classify each item and then drag and drop each item to classify it as a <span className="Emphasis">cold water load</span> or <span className="Emphasis">save for later load</span> item.</p>: <p className="No-Margin-Bottom">Decide how to classify each item and then drag and drop each item to classify it as a <span className="Emphasis">cold water load</span> or <span className="Emphasis">save for later load</span> item.</p>}
                            </div>
                            <NextButtonOverlay toggleOverlay={toggleOverlay}/>
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
                    <p>Drag and drop each item to classify it as a <span className="Emphasis">cold water load</span> or <span className="Emphasis">save for later load</span> item.</p>
                    <p>Laundry rules:</p>
                    <ul className="Margin-Bottom">
                        <li>{rules.rule1}</li>
                        <li>{rules.rule2}</li>
                        <li>{rules.rule3}</li>
                    </ul>
                </Description>
                <RoleShort moduleName="prediction"/>
                <Terminology margin="Margin-Large-Bottom">
                    <Term term={terms['algorithm']}/>
                </Terminology>
                <BackButton routeBack={routeBack}/>
            </LeftSideBar>
            <Content items={items} setItems={setItems} nClassified={nClassified} setNClassified={setNClassified} setDisabled={setDisabled} user={user} rules={rules} setRules={setRules} name={name}/>
            <RightSideBar>
                <Progress id={id} modules={modules}/>
                <NextButton routeNext={routeNext} disabled={disabled}/>
            </RightSideBar>
        </div>
        <Footer/>
    </div>
    )
}
