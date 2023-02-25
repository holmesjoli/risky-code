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
import { Button, FormControl, RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox, TextField } from '@material-ui/core';
import * as d3 from 'd3';
import { BackButton, NextButton } from '../../components/Button';
import { LeftSideBar, RightSideBar } from "../../components/Sidebar";

let data = []

function stakeholderNetwork() {

    return(
        <div className="Container">
            <h3>stakeholder mapping</h3>
            <svg id="Stakeholder-Mapping-Diagram"></svg>
        </div>
    )
}

function AddStakeholder() {

    // [{"id": "root", "children": []}]
    const [data, setData] = useState([]);
    const [stakeholderName, updateStakeholderName] = useState("");
    const [stakeholderGroup, updateStakeholderGroup] = useState("primary");
    const [stakeholderValues, updateStakeholderValues] = useState([]);

    const setStakeholder = ev => {
        updateStakeholderName(ev.target.value);
    }

    const setStakeholderGroup = ev => {
        updateStakeholderGroup(ev.target.value);
    }

    const setStakeholderValues = ev => {

        let value = ev.target.value;
        let checked = ev.target.checked;

        if(!stakeholderValues.includes(value) && checked) {
            stakeholderValues.push(value)
        } else if(!checked) {
            const index = stakeholderValues.indexOf(value);
            if (index > -1) { // only splice array when item is found
                stakeholderValues.splice(index, 1); // 2nd parameter means remove one item only
            }
        }
    }

    const add = () => {

        let stakeholder = {"name": stakeholderName,
                           "group": stakeholderGroup,
                           "values": stakeholderValues};

        data.push(stakeholder);

        updateStakeholderName("");
        updateStakeholderGroup("primary");
        updateStakeholderValues([]);
    }

    console.log(stakeholderName)

    useEffect(() => {

        console.log(data)

    }, [stakeholderName, stakeholderGroup, stakeholderValues]);

    return(
        <div className="Stakeholder-Attr Container">
            <h3>add stakeholder</h3>
            <div className="Card-Group">
                <h4>stakeholder group</h4>
                <TextField value={stakeholderName} placeholder="add the stakeholder group name" variant="outlined" onChange={setStakeholder}/>
            </div>
            <div className="Card-Group">
                <FormControl>
                    <h4>stakeholder type</h4>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="primary"
                        name="radio-buttons-group"
                        onChange={setStakeholderGroup}
                    >
                        <FormControlLabel value="primary" control={<Radio />} label="Primary" />
                        <FormControlLabel value="secondary" control={<Radio />} label="Secondary" />
                        <FormControlLabel value="tertiary" control={<Radio />} label="Tertiary" />
                    </RadioGroup>
                </FormControl>
            </div>
            <div className="Card-Group">
                <h4>stakeholder values</h4>
                <FormGroup>
                    <div>
                        <FormControlLabel control={<Checkbox value="Freedom" onClick={setStakeholderValues}/>} label="Freedom" />
                        <FormControlLabel control={<Checkbox value="Autonomy" onClick={setStakeholderValues}/>} label="Autonomy" />
                        <FormControlLabel control={<Checkbox value="Privacy" onClick={setStakeholderValues}/>} label="Privacy" />
                        <FormControlLabel control={<Checkbox value="Security" onClick={setStakeholderValues}/>} label="Security" />
                        <FormControlLabel control={<Checkbox value="Safety" onClick={setStakeholderValues}/>} label="Safety" />
                        <FormControlLabel control={<Checkbox value="Anonymity" onClick={setStakeholderValues}/>} label="Anonymity" />
                        <FormControlLabel control={<Checkbox value="Reliability" onClick={setStakeholderValues}/>} label="Reliability" />
                        <FormControlLabel control={<Checkbox value="Trust" onClick={setStakeholderValues}/>} label="Trust" />
                        <FormControlLabel control={<Checkbox value="Ownership and property" onClick={setStakeholderValues}/>} label="Ownership and property" />
                        <FormControlLabel control={<Checkbox value="Informed consent" onClick={setStakeholderValues}/>} label="Informed consent" />
                        <FormControlLabel control={<Checkbox value="Identity" onClick={setStakeholderValues}/>} label="Identity" />
                        <FormControlLabel control={<Checkbox value="Environment sustainability" onClick={setStakeholderValues}/>} label="Environment sustainability" />
                        <FormControlLabel control={<Checkbox value="Other" onClick={setStakeholderValues}/>} label="Other" />
                    </div>
                </FormGroup>
            </div>
            <Button variant="outlined" color="secondary" size="small" onClick={add}>add stakeholder to diagram</Button>
        </div>
    )
}

export function Content({direct, setDirect, indirect, setIndirect}) {

    // const updateDirectStakeholders = (event) => {
    //     setDirect(event.target.value)
    // }

    // const updateIndirectStakeholders = (event) => {
    //     setIndirect(event.target.value)
    // }  

    return(
        <div className="Content One-Column-Three">
            <div className="">
                {AddStakeholder()}
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
            <LeftSideBar>
                <Description config={config}/>
                <Terminology>
                    <div className="Container-Rule">
                        <h4>stakeholders</h4>
                        <p>People impacted directly or indirectly by a system <NavLink to="/Resources">(Bender and Friedman 2018)</NavLink></p>
                    </div>
                </Terminology>
                <BackButton routeBack={routeBack}/>
            </LeftSideBar>
            <Content direct={direct} setDirect={setDirect} indirect={indirect} setIndirect={setIndirect}/>
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
