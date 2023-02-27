import React, {  useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Progress from "../../components/Progress";
import Terminology from '../../components/Terminology';
import { BackButton, NextButton } from '../../components/Button';

export function Content({items, setItems}) {

    return(
        <div className="Content">

        </div>
    )
}

export default function Optimize({config, items, setItems, modules}) {

    let navigate = useNavigate(); 
    const routeNext = () => {
      let path = `/Calibration`; 
      navigate(path);
    }

    const routeBack = () => {
      let path = `/Train`; 
      navigate(path);
    }

    return (
        <div className="App">
        <Header/>
            <div className="Main">
                <div className="Sidebar-Left">
                    <Description config={config}/>
                    <Terminology>
                        <div className="Container-Rule">
                            <h4>algorithm</h4>
                            <p>A series of steps that allow you to perform a particular task <NavLink to="/Resources">(Onuoha and Nucera 2018)</NavLink></p>
                        </div>
                    </Terminology>
                    <BackButton routeBack={routeBack}/>
                </div>
                <Content items={items} setItems={setItems}/>
                <div className="Sidebar-Right">
                    <Progress id={config.id} modules={modules}/>
                    <NextButton routeNext={routeNext}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
