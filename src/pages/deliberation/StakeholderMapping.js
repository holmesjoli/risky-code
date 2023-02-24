import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Overlay from "../../components/Overlay";
import { policyDiagram } from '../../components/PolicyDiagram';
import Terminology from '../../components/Terminology';
import Progress from "../../components/Progress";
import PolicyScenario from "../../components/PolicyScenario";
import { Button, TextField, FormControl, RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox } from '@material-ui/core';

function stakeholderNetwork() {

    return(
        <div className="Container">
            <h3>stakeholder mapping</h3>
        </div>
    )
}

const submit = () => {

}

function addStakeholder() {

    return(
        <div className="Stakeholder-Attr Container">
            <h3>add stakeholder</h3>
            <div className="Card-Group">
                <FormControl>
                    <h4>stakeholder group</h4>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="primary"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="primary" control={<Radio />} label="Primary" />
                        <FormControlLabel value="secondary" control={<Radio />} label="Secondary" />
                        <FormControlLabel value="tertiary" control={<Radio />} label="Tertiary" />
                    </RadioGroup>
                </FormControl>
            </div>
            <div className="Card-Group">
                <h4>check values</h4>
                <FormGroup>
                    <div>
                        <FormControlLabel control={<Checkbox />} label="Freedom" />
                        <FormControlLabel control={<Checkbox />} label="Autonomy" />
                        <FormControlLabel control={<Checkbox />} label="Privacy" />
                        <FormControlLabel control={<Checkbox />} label="Security" />
                        <FormControlLabel control={<Checkbox />} label="Safety" />
                        <FormControlLabel control={<Checkbox />} label="Anonymity" />
                        <FormControlLabel control={<Checkbox />} label="Reliability" />
                        <FormControlLabel control={<Checkbox />} label="Trust" />
                        <FormControlLabel control={<Checkbox />} label="Ownership and property" />
                        <FormControlLabel control={<Checkbox />} label="Informed consent" />
                        <FormControlLabel control={<Checkbox />} label="Identity" />
                        <FormControlLabel control={<Checkbox />} label="Environment sustainability" />
                    </div>
                </FormGroup>
            </div>
            <Button variant="outlined" color="secondary" size="small" onClick={submit}>add stakeholder to diagram</Button>
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
            <div className="">
                {addStakeholder()}
            </div>
            <div className="">
                {stakeholderNetwork()}
            </div>
        </div>
    )
}

export default function StakeholderMapping({config, modules, direct, setDirect, indirect, setIndirect, policy, setPolicy}) {

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
                <Progress id={id} modules={modules}/>
                <PolicyScenario policy={policy} setPolicy={setPolicy}/>
                <div className="Button-Container-Right">
                    <Button variant="contained" className="Next" onClick={routeNext}>next</Button>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
    )
}
