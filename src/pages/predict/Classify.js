import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sort from "../../components/Sort";
import Overlay from "../../components/Overlay";
import Progress from "../../components/Progress";
import Terminology from '../../components/Terminology';
import { BackButton, NextButton } from '../../components/Button';

export function Content({items, setItems, nClassified, setNClassified}) {

    return(
        <div className="Content">
            <Sort items={items} setItems={setItems} nClassified={nClassified} setNClassified={setNClassified}/>
        </div>
    )
}

export default function Classify({config, items, setItems, modules}) {

    const [isOpen, setIsOpen] = useState(true);
    const [nClassified, setNClassified] = useState(0);
    const [id, setId] = useState("predict");

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
        setId(isOpen ? "predict": "classify")
    }, [isOpen])

    return (
        <div className="App"> {
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
                    <p>In this module, we will build a simple predictive algorithm to demonstrate how predictive modeling works. The classifier we are building is called Laundry AID (Algorithmically Informed Decision-Making). Given a basket of dirty laundry, Laundry AID will predict which laundry items should be added to a hot water laundry load and which items should be saved later. Laundry AID aims to simplify the laundry process by automating the sorting step.</p>
                    <p>The steps to build Laundry AID are <span className='Semi-Bold'>train</span>, <span className='Semi-Bold'>model</span>, and <span className='Semi-Bold'>optimize</span>.</p>
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
                        <div className="Container-Rule">
                            <h4>Algorithm</h4>
                            <p>People impacted directly or indirectly by a system <NavLink to="/Resources">(Onuoha and Nucera 2018)</NavLink></p>
                        </div>
                    </Terminology>
                    <BackButton routeBack={routeBack}/>
                </div>
                <Content items={items} setItems={setItems} nClassified={nClassified} setNClassified={setNClassified}/>
                <div className="Sidebar-Right">
                    <Progress id={id} modules={modules}/>
                    <NextButton routeNext={routeNext}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
