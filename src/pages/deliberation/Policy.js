import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Overlay from "../../components/Overlay";
import { policyDiagram } from '../../components/PolicyDiagram';
import { terms } from '../../utils/global';
import Progress from "../../components/Progress";
import { PolicyScenario } from "../../components/TrackUserInputs";
import * as d3 from 'd3';
import { BackButton, NextButton, NextButtonOverlay } from '../../components/Button';
import { visStyles } from "../../utils/global";
import Timer from "../../components/Timer";
import { LeftSideBar, RightSideBar, Description, Terminology, Term, RoleAccordion, Role } from "../../components/Sidebar";
import StakeholderMapping from "../../components/StakeholderMapping";

export default function Policy({config, user, disableDeliberationNext, setDisableDeliberationNext, modules, policy, setPolicy}) {

    const [isOpen, setIsOpen] = useState(true);
    const [id, setId] = useState("deliberation");
    let navigate = useNavigate();
    let chartId = "Policy-Chart3";

    const routeNext = () => {
        let path = `/Risk`; 
        navigate(path);
    }

    const routeBack = () => {
        let path = `/Health`; 
        navigate(path);
    }

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setId(isOpen ? "deliberation": "stakeholders");
    }, [isOpen])

    useEffect(() => {
        policyDiagram(chartId, 480, 480, "colorMode", false);
    }, []);

    return (
        <div className="App"> {
            isOpen ?
            <Overlay isOpen={isOpen} onClose={toggleOverlay}>
            <div className="Containers-Container">
                <div className="Container-Fill-Secondary No-Padding-Right">
                    <div className="Two-Column-Three">
                        <div>
                            <h3 className="Page-Title Center">introduction to  deliberation</h3>
                            <div className="chart" id={chartId}></div>
                            <h6 className="Small-Margin">Visualization showing changing risk levels of policy decisions where algorithmically informed-decision making is currently in use. Visualization data created from examples in <NavLink to="/Resources">O'Neil (2016) AINOW (2018), Eubanks (2018), and Obermeyer et al. (2019)</NavLink>.</h6>
                        </div>
                        <RightSideBar>
                            <Role moduleName="deliberation"/>
                            <div className="Card-Group">
                                <h4>situating risk</h4>
                                <p className="No-Margin-Bottom">Many algorithms intervening in public policy decisions are considered high-stakes decision-making cases (e.g., predict child maltreatment, automated recruitment decisions, college admissions), but not all are. The goal of this module is to visually assess risk across numerous dimensions to answer the question, <span className="Italic">is it appropriate to use algorithmic decision-making for my specific public policy use case?</span></p>
                            </div>
                            <Timer user={user} disableNext={disableDeliberationNext} setDisableNext={setDisableDeliberationNext}>
                                <p>Brainstorm examples of where algorithmically-informed decision-making is used.</p>
                                <p>Pick one scenario and brainstorm some potential consequences (positive and negative) of that example.</p>
                                {/* <p>Do you think algorithmic decision-making should be used to inform all types of policy decisions? Why or why not?</p> */}
                                {/* <p className="Small-Margin">Do you think algorithmic decision-making is more risky in certain scenarios?</p> */}
                            </Timer>
                            {toggleOverlay? <NextButtonOverlay disabled={disableDeliberationNext} toggleOverlay={toggleOverlay}/>: <></>}
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
                    <p>Who are the stakeholders of that policy scenario? What are their values? How could algorithmically informed decision-making lead to good or potentially bad outcomes for those stakeholders. Write your answers in the text box.</p>
                </Description>
                <RoleAccordion moduleName="deliberation"/>
                <Terminology margin="Margin-Large-Bottom">
                    <Term term={terms['direct stakeholders']}/>
                    <Term term={terms['indirect stakeholders']}/>
                    <Term term={terms['excluded stakeholders']}/>
                </Terminology>
                <BackButton routeBack={routeBack}/>
            </LeftSideBar>
            <StakeholderMapping />
            <RightSideBar>
                <Progress id={id} modules={modules}/>
                <PolicyScenario policy={policy} setPolicy={setPolicy}/>
                <NextButton routeNext={routeNext}/>
            </RightSideBar>
        </div>
        <Footer/>
    </div>
    )
}
