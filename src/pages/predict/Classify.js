import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import Navigation from '../../components/Navigation';
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sort from "../../components/Sort";
import Overlay from "../../components/Overlay";

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
      let path = `/`; 
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
                <div className="Container">
                    <div className="Overlay-Controls">
                        <h3>introduction to predict</h3>
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
                        <div className="Button-Container-Left">
                            <Button variant="outlined" color="secondary" onClick={routeBack}>back</Button>
                        </div>
                    </div>
                    <Content items={items} setItems={setItems} nClassified={nClassified} setNClassified={setNClassified}/>
                    <div className="Sidebar-Right">
                        <div className="Button-Container-Right">
                            {/* <Button variant="contained" className="Next" disabled={nClassified !== items.length} onClick={routeNext}>next</Button> */}
                            <Button variant="contained" className="Next" onClick={routeNext}>next</Button>
                        </div>
                        <Navigation id={id} modules={modules}/>
                    </div>
                </div>
                <Footer/>
        </div>
    )
}
