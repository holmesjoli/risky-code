import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import { TextField } from "@material-ui/core";
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Overlay from "../../components/Overlay";
import { policyDiagram } from '../../components/PolicyDiagram';
import Terminology from '../../components/Terminology';
import Navigation from "../../components/Navigation";
import Progress from "../../components/Progress";

export function Content({direct, setDirect, indirect, setIndirect}) {

    const updateDirectStakeholders = (event) => {
        setDirect(event.target.value)
    }

    const updateIndirectStakeholders = (event) => {
        setIndirect(event.target.value)
    }

    return(
        <div className="Content Three-Row">
            <div className="No-Margin-Bottom">
                <h3 className="Small-Margin">policy scenario</h3>
                <div className="Container">
                    <TextField placeholder="Add your policy scenario here" variant="outlined" />
                </div>
            </div>
            <div className="No-Margin-Bottom">
                <h3 className="Small-Margin">direct stakeholders</h3>
                <div className="Four-Column">
                    <div className="Container No-Margin-Bottom Column">
                        <h5>group</h5>
                        <TextField label={direct} placeholder="edit me" variant="outlined" multiline={true} onChange={updateDirectStakeholders}/>
                    </div>
                    <div className="Container No-Margin-Bottom Column">
                        <h5>values</h5>
                        <TextField placeholder="edit me" variant="outlined" multiline={true}/>
                    </div>
                    <div className="Container No-Margin-Bottom Column">
                        <h5>best case scenario</h5>
                        <TextField placeholder="edit me" variant="outlined" multiline={true}/>
                    </div>
                    <div className="Container No-Margin-Bottom Column">
                        <h5>worst case scenario</h5>
                        <TextField placeholder="edit me" variant="outlined" multiline={true}/>
                    </div>
                </div>
            </div>
            <div className="No-Margin-Bottom">
                <h3 className="Small-Margin">indirect stakeholders</h3>
                <div className="Four-Column">
                    <div className="Container No-Margin-Bottom Column">
                        <h5>group</h5>
                        <TextField label={indirect} placeholder="edit me" variant="outlined" multiline={true} onChange={updateIndirectStakeholders}/>
                    </div>
                    <div className="Container No-Margin-Bottom Column">
                        <h5>values</h5>
                        <TextField placeholder="edit me" variant="outlined" multiline={true}/>
                    </div>
                    <div className="Container No-Margin-Bottom Column">
                        <h5>best case scenario</h5>
                        <TextField placeholder="edit me" variant="outlined" multiline={true}/>
                    </div>
                    <div className="Container No-Margin-Bottom Column">
                        <h5>worst case scenario</h5>
                        <TextField placeholder="edit me" variant="outlined" multiline={true}/>
                    </div>
                </div>
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
                <Progress id={config.id} modules={modules}/>
                <Terminology>
                    <div className="Container-Rule">
                        <h5>stakeholders</h5>
                        <p>People impacted directly or indirectly by a system <NavLink to="/Resources">(Bender and Friedman 2018)</NavLink></p>
                    </div>
                </Terminology>
            </div>
            <Content direct={direct} setDirect={setDirect} indirect={indirect} setIndirect={setIndirect}/>
            <div className="Sidebar-Right">
                <Navigation routeNext={routeNext} routeBack={routeBack} config={config} modules={modules}/>
            </div>
        </div>
        <Footer/>
    </div>
    )
}
