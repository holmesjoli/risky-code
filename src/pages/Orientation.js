import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { RadioGroup, FormControlLabel, Radio, TextField } from '@material-ui/core';
import * as React from 'react';
import Box from "@material-ui/core/Box";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

export default function Orientation({user, setUser, name, setName, groupName, setGroupName}) {
    const [activeStep, setActiveStep] = React.useState(0);
    let navigate = useNavigate();

    const routeNext = () => {
        let path = `/Prediction`;
        navigate(path);
    }

    const routeBack = () => {
        let path = `/`;
        navigate(path);
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const updateUser = ev => {
        setUser(ev.target.value);
    }

    const updateName = (event) => {
        setName(event.target.value)
    };

    const updateGroupName = (event) => {
        setGroupName(event.target.value)
    };

    const Welcome = () => {
        return(
            <div className="Container2 Margin-Bottom">
                <p className="No-Margin-Bottom">Risky Code is a digital workshop intended to educate participants and facilitate discussion about algorithmically informed decision-making.</p>
            </div>
        )
    }

    const userGroup = (user, updateUser, name, updateName, groupName, updateGroupName) => {
        return(
            <div className="Container2 Margin-Bottom">
                <div className="No-Margin-Bottom">
                    <p>Risky Code has two user experiences, one is designed for small groups (~3-6 people) and the other is geared towards individuals.</p>
                    <div className="">
                        <p className="Small-Margin">Indicate how you intend to use Risky Code:</p>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            onChange={updateUser}
                            value={user}
                            className="No-Margin-Bottom Margin-Left"
                        >
                            <FormControlLabel value="group" control={<Radio />} label="Group" />
                            <FormControlLabel value="individual" control={<Radio />} label="Individual" />
                        </RadioGroup>
                    </div>
                    {user === "group"?
                        <div className="No-Margin-Bottom">
                            <p className="No-Margin-Bottom Padding-Top">A facilitator should share their screen during the group experience.</p>
                        </div>:
                        <></>
                    }
                </div>
            </div>
        )
    }

    const Modules = () => {
        return(
            <div className="Container2 Margin-Bottom">
                <p className="Medium-Margin">Risky Code takes approximately ~1 hour to complete and is comprised of four learning modules.</p>
                <ul className="No-Margin-Bottom">
                    <li className="Small-Margin"><span className="Semi-Bold">Algorithmic Prediction</span> </li>
                    <li className="Small-Margin"><span className="Semi-Bold">Algorithmic Fairness</span></li>
                    <li className="Small-Margin"><span className="Semi-Bold">Stakeholder Mapping</span></li>
                    <li className="Small-Margin"><span className="Semi-Bold">Deliberation</span></li>
                </ul>
                {/* <p className="No-Margin-Bottom">Each module has specific learning outcomes to achieve the overarching goal of <span className="Emphasis">informing and to facilitating deliberation about algorithmically informed decision-making</span>.</p> */}
            </div>
        )
    }

    const Role = ({user}) => {
        return(
            <div className="Container2 Margin-Bottom">
                <p>Each module has a target persona reflected as a <span className="Emphasis">role</span>. The roles highlight constraints and decisions that someone may face.</p>
                <p>In each module, {user === "group"? "imagine your team as a group of:" : "imagine yourself as a:"} </p>
                <ul className="No-Margin-Bottom">
                    <li className="Small-Margin"><span className="Semi-Bold">You</span> — {user === "group"? "people who are " : "an individual who is "} interested in learning about algorithmic decision making</li>
                    <li className="Small-Margin"><span className="Semi-Bold">{user === "group"? "Data Scientists" : "Data Scientist"}</span> — interested in algorithmic fairness and equity</li>
                    <li className="Small-Margin"><span className="Semi-Bold">{user === "group"? "Designers" : "Designer"}</span> — interested in applying design methods to algorithmic decision-making</li>
                    <li className="Small-Margin"><span className="Semi-Bold">{user === "group"? "Public Policymakers" : "Public Policymaker"}</span> — interested in using algorithmic decision-making in equitable and fair ways</li>
                </ul>
            </div>
        )
    }

    const steps = [
      {
        label: 'welcome to risky code',
        children: <Welcome/>
      },
      {
        label: 'intended audience',
        children: userGroup(user, updateUser, name, updateName, groupName, updateGroupName)
      },
      {
        label: 'module overview',
        children: <Modules/>
      },
      {
        label: 'roles',
        children: <Role user={user}/>
      }
    ];

    return (
        <div className="Orientation">
            <div className="Container Margin-Bottom">
            <h2>orientation</h2>
                <Box sx={{ width: 500 }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel>
                        <h3 className="Small-Margin">{step.label}</h3>
                        </StepLabel>
                        <StepContent>
                            {step.children}                      
                            <Box sx={{ mb: 2 }}>
                                <div className="Row">
                                    <Button
                                        size="small"
                                        variant="outlined" 
                                        color="secondary"
                                        onClick={index === 0? routeBack:handleBack}
                                    >
                                        back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        size="small"
                                    >
                                        next
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Button onClick={routeNext} className="Purple" variant="outlined">
                        continue to algorithmic prediction
                    </Button>
                )}
                </Box>
            </div>
        </div>
    );
}
