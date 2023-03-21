import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import { Slider, MenuItem, FormControl, Select } from '@material-ui/core';
import * as d3 from 'd3';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Progress from "../../components/Progress";
import { BackButton, NextButton } from '../../components/Button';
import { LeftSideBar, RightSideBar, Description, Terminology, Term } from "../../components/Sidebar";
import { terms } from '../../utils/global';
import { Consequence } from "../../components/TrackUserInputs";
import StakeholderMapping from "../../components/StakeholderMapping";
import { RoleShort } from "../../components/Role";

export default function Health({config, modules}) {

    let navigate = useNavigate();

    const routeNext = () => {
        let path = `/StakeholderReflection`; 
        navigate(path);
    }

    const routeBack = () => {
        let path = `/StreetBump`; 
        navigate(path);
    }

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <LeftSideBar>
                    <Description config={config}>
                    </Description>
                    <RoleShort moduleName="caseStudies"/>
                    <Terminology margin="Margin-Large-Bottom">
                        <Term term={terms['direct stakeholders']}/>
                        <Term term={terms['indirect stakeholders']}/>
                        <Term term={terms['excluded stakeholders']}/>
                    </Terminology>
                    <BackButton routeBack={routeBack}/>
                </LeftSideBar>
                <StakeholderMapping/>
                <RightSideBar>
                    <Progress id={config.id} modules={modules}/>
                    <Consequence/>
                    <NextButton routeNext={routeNext}/>
                </RightSideBar>
            </div>
            <Footer/>
        </div>
    )
}
