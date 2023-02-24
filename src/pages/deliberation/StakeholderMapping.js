import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import { TextField } from "@material-ui/core";
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Overlay from "../../components/Overlay";
import { policyDiagram } from '../../components/PolicyDiagram';
import Terminology from '../../components/Terminology';
import Progress from "../../components/Progress";
import { Button } from "@material-ui/core";
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


function addStakeholder() {

    return(
        <div className="Add-Stakeholder">
         <Fab color="primary" aria-label="add" size="small">
            <AddIcon />
        </Fab>
        </div>
    )
}

export function Content({direct, setDirect, indirect, setIndirect}) {

    const updateDirectStakeholders = (event) => {
        setDirect(event.target.value)
    }

    const updateIndirectStakeholders = (event) => {
        setIndirect(event.target.value)
    }  

    return(
        <div className="Content One-Column-Three">
            <div className="Container">
                {addStakeholder()}
            </div>
            <div className="Container">
            </div>
        </div>
    )
}

export default function StakeholderMapping({config, modules, direct, setDirect, indirect, setIndirect}) {

    const [isOpen, setIsOpen] = useState(true);
    const [id, setId] = useState("deliberation");
    let navigate = useNavigate();
    let chartID = "Policy-Chart3";

    const routeNext = () => {
        let path = `/Risk`; 
        navigate(path);
    }
  
    const routeBack = () => {
        let path = `/COMPAS`; 
        navigate(path);
    }

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setId(isOpen ? "deliberation": "stakeholders");
    }, [isOpen])

    useEffect(() => {
        policyDiagram(chartID, 480, 480, "colorMode", false);
    }, []);

    return (
        <div className="App"> {
            isOpen ?
            <Overlay isOpen={isOpen} onClose={toggleOverlay}>
            <div className="Containers-Container">
                <div className="Container-Fill-Secondary">
                    <div className="Overlay-Controls">
                        <h3 className="Page-Title">introduction to deliberation</h3>
                        <button
                            className="Overlay-Close"
                            type="button"
                            onClick={toggleOverlay}
                        />
                    </div>
                    <p>Many algorithms intervening in public policy decisions are considered high-stakes decision-making cases (e.g., predict child maltreatment, automated recruitment decisions, college admissions), but not all are. The last module showed two examples of algorithmically informed decision-making use cases. The goal of this module is to visually assess risk across numerous dimensions to answer the question, <span className="Italic">is it appropriate to use algorithmic decision-making for my specific public policy use case?</span></p>
                    <div id={chartID} className="chart"></div>
                    <h6 className="Small-Margin">Visualization showing changing risk levels of policy decisions where algorithmically informed-decision making is currently in use. Visualization data created from examples in <NavLink to="/Resources">O'Neil (2016) AINOW (2018), Eubanks (2018), and Obermeyer et al. (2019)</NavLink>.</h6>
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
                        <h4>stakeholders</h4>
                        <p>People impacted directly or indirectly by a system <NavLink to="/Resources">(Bender and Friedman 2018)</NavLink></p>
                    </div>
                </Terminology>
                <div className="Button-Container-Left">
                    <Button variant="outlined" color="secondary" className="Back" onClick={routeBack}>back</Button>
                </div>
            </div>
            <Content direct={direct} setDirect={setDirect} indirect={indirect} setIndirect={setIndirect}/>
            <div className="Sidebar-Right">
                <Progress id={config.id} modules={modules}/>
                <div className="No-Margin-Bottom">
                    <h3 className="Small-Margin">policy scenario</h3>
                        <div className="Container">
                            <TextField placeholder="Add your policy scenario here" variant="outlined" multiline rows={20} />
                        </div>
                    </div>
                <div className="Button-Container-Right">
                    <Button variant="contained" className="Next" onClick={routeNext}>next</Button>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
    )
}
