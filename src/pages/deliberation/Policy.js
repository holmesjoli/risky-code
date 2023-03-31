import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Overlay from "../../components/Overlay";
import { policyDiagram } from '../../components/PolicyDiagram';
import { terms } from '../../utils/global';
import Progress from "../../components/Progress";
import { PolicyScenario } from "../../components/TrackUserInputs";
import { BackButton, NextButton, NextButtonOverlay } from '../../components/Button';
import { LeftSideBar, RightSideBar, Description, Terminology, Term } from "../../components/Sidebar";
import StakeholderMapping from "../../components/StakeholderMapping";
import { RoleShort } from "../../components/Role";

export default function Policy({config, user, modules, policy, setPolicy, data, setData, stakeholderData, setStakeholderData}) {

    const [isOpen, setIsOpen] = useState(true);
    const [id, setId] = useState("deliberation");
    let navigate = useNavigate();
    let chartId = "Policy-Chart3";

    const routeNext = () => {
        let path = `/Risk`; 
        navigate(path);
    }

    const routeBack = () => {
        let path = `/Deliberation`; 
        navigate(path);
    }

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setId(isOpen ? "deliberation": config.id);
    }, [isOpen])

    useEffect(() => {
        policyDiagram(chartId, 450, 450, "colorMode", false);
    }, []);

    return (
        <div className="App"> {
            isOpen ?
            <Overlay isOpen={isOpen} onClose={toggleOverlay}>
            <div className="Containers-Container">
                <div className="Container-Fill-Secondary No-Padding-Right">
                    <h3 className="Page-Title">introduction to  deliberation</h3>
                    <div className="Two-Column-Three">
                        <div className="Container2">
                            <h4 className="Small-Margin Text-Align-Left">explore</h4>
                            <div className="chart" id={chartId}></div>
                            <h6 className="Small-Margin Text-Align-Left">Visualization showing changing risk levels of policy decisions where algorithmically informed-decision making is currently in use. Visualization data created from examples in <NavLink to="/Resources" className="Purple">O'Neil (2016) AINOW (2018), Eubanks (2018), and Obermeyer et al. (2019)</NavLink>.</h6>
                        </div>
                        <RightSideBar>
                            <PolicyScenario policy={policy} setPolicy={setPolicy} className="Container2"/>
                            <NextButtonOverlay toggleOverlay={toggleOverlay} className="Purple"/>
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
                <Description title={config.title}>
                    <p>Who are the stakeholders of that policy scenario? What are their values? How could algorithmically informed decision-making lead to good or potentially bad outcomes for those stakeholders. Write your answers in the text box.</p>
                </Description>
                <RoleShort moduleName="deliberation"/>
                <Terminology margin="Margin-Large-Bottom" className="Purple">
                    <Term term={terms['stakeholders']}/>
                    <Term term={terms['direct stakeholders']}/>
                    <Term term={terms['indirect stakeholders']}/>
                    <Term term={terms['excluded stakeholders']}/>
                </Terminology>
                <BackButton routeBack={routeBack}/>
            </LeftSideBar>
            <StakeholderMapping data={data} setData={setData} stakeholderData={stakeholderData} setStakeholderData={setStakeholderData} className="Purple"/>
            <RightSideBar>
                <Progress id={id} modules={modules} className="Purple"/>
                <PolicyScenario policy={policy} setPolicy={setPolicy}/>
                <NextButton routeNext={routeNext} className="Purple"/>
            </RightSideBar>
        </div>
        <Footer/>
    </div>
    )
}
