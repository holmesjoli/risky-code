import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Progress from "../../components/Progress";
import { BackButton, NextButton } from '../../components/Button';
import SortLaundry from "../../components/SortLaundry";
import { LeftSideBar, RightSideBar, Description, Terminology, Term } from "../../components/Sidebar";
import { terms } from "../../utils/global";
import { RoleShort } from "../../components/Role";

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
      let path = `/Orientation`; 
      navigate(path);
    }

    useEffect(() => {
        setId(isOpen ? "predict": "classify");
    }, [isOpen]);

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <LeftSideBar>
                    <Description config={config}>
                        <p>This research defines an algorithm as a series of steps that allow you to perform a particular task.</p>
                        <p>One analogy is laundry. <span className="Emphasis">How do you sort laundry for different load types?</span></p>
                        <p>One rule many people use is color. However, other indicators such as item type or type of machine load could impact your laundry sorting decision.</p>
                        <p>And What does one do with gray clothes anyway?</p>
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
