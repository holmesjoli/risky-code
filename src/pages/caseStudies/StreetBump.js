import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Overlay from "../../components/Overlay";
import { Consequence } from "../../components/TrackUserInputs";
import { terms } from '../../utils/global';
import { BackButton, NextButton, NextButtonOverlay } from '../../components/Button';
import { LeftSideBar, RightSideBar, Description, Terminology, Term } from "../../components/Sidebar";
import StakeholderMapping from "../../components/StakeholderMapping";
import { RoleShort } from "../../components/Role";
import Progress from "../../components/Progress";

import { policyDiagram } from '../../components/PolicyDiagram';
import * as d3 from 'd3';
import MiniModel from "../../components/MiniStakeholderModel";

export default function StreetBump({config, user, modules, data, setData, stakeholderData, setStakeholderData}) {

    const [isOpen, setIsOpen] = useState(true);
    const [id, setId] = useState("stakeholderMapping");
    let chartID = "Policy-Chart2";

    let navigate = useNavigate();

    const routeNext = () => {
        let path = `/StakeholderReflection`; 
        navigate(path);
    }
  
    const routeBack = () => {
        let path = `/StakeholderMapping`; 
        navigate(path);
    }

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setId(isOpen ? "stakeholderMapping": config.id);
    }, [isOpen]);

    useEffect(() => {
        policyDiagram(chartID, 490, 490, "darkMode", true);
    }, []);

    return (
        <div className="App">
            {
            isOpen ?
            <Overlay isOpen={isOpen} onClose={toggleOverlay}>
            <div className="Containers-Container">
                <div className="Container-Fill-Secondary No-Padding-Right">
                    <div className="Two-Column-Three">
                        <div>
                            <h3 className="Page-Title Small-Margin Padding-">stakeholder mapping for street bump</h3>
                            <div className="Medium-Margin-Top">
                                <MiniModel/>
                            </div>
                        </div>
                        <RightSideBar>
                            <div className="Container2 Margin-Bottom">
                                <h4 className="Small-Margin">learn</h4>
                                <p className="No-Margin-Bottom">Street Bump was an application developed for the city of Boston in 2011 to identify potholes in need of repair. The application relied on people with smartphones to opt-in, download, and open the application during their daily commutes around Boston. The application recorded acceleration and GPS data to help the city identify road problems.</p>
                            </div>
                            <div className="Container2">
                                <h4 className="Small-Margin">brainstorm</h4>
                                <p className="No-Margin-Bottom">Start by brainstorming who the direct stakeholders of Street Bump would be. Are there any indirect stakeholders? Is anyone excluded from the using the application?</p>
                            </div>
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
                <Description title={config.title} id={config.id} modules={modules}>
                    <p>Create a stakeholder map for stakeholders of the Street Bump application. </p>
                    <p>Then add your brainstorm to the map to see how the stakeholders' values overlap.</p>
                </Description>
                <div className="Margin-Bottom Bottom-Rule Padding-Bottom">
                    <h3>Navigation</h3>
                    <NextButton routeNext={routeNext} className="Purple"/>
                    <div className="Button-Container-Right">
                        <BackButton routeBack={routeBack}/>
                        <Progress id={id} modules={modules} className="Purple"/>
                    </div>
                </div>
                <h3>Additional Information</h3>
                <RoleShort moduleName="caseStudies"/>
                <Terminology className="Margin-Bottom">
                    <Term term={terms['stakeholders']}/>
                    <Term term={terms['direct stakeholders']}/>
                    <Term term={terms['indirect stakeholders']}/>
                    <Term term={terms['excluded stakeholders']}/>
                </Terminology>
                <Consequence className="Purple"/>
            </LeftSideBar>
            <StakeholderMapping data={data} setData={setData} stakeholderData={stakeholderData} setStakeholderData={setStakeholderData} className="Purple" modules={modules} id={id}/>
        </div>
        <Footer/>
    </div>
    )
}
