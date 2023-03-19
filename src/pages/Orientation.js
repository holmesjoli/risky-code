import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { RadioGroup, FormControlLabel, Radio, TextField } from '@material-ui/core';
import * as React from 'react';
import Box from "@material-ui/core/Box";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import { Terminology, Term } from "../components/Sidebar";
import { terms } from '../utils/global';
import Progress from "../components/Progress";

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
            <div className="Container Margin-Bottom">
                <p className="No-Margin-Bottom">Risky Code is a digital toolkit designed to inform and to facilitate deliberation about algorithmically informed decision-making.</p>
            </div>
        )
    }

    const userGroup = (user, updateUser, name, updateName, groupName, updateGroupName) => {
        return(
            <div className="Container Margin-Bottom">
                <div className="No-Margin-Bottom">
                    <p>Risky Code is designed to be used in a small group setting (approximately three to six people) to facilitate discussion and deliberation. Individuals are also encouraged to try Risky Code, however, the experience is designed to differ slightly.</p>
                    <div className="Card-Group">
                        <p className="Small-Margin">Indicate how you intend to use Risky Code.</p>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            onChange={updateUser}
                            value={user}
                            className="No-Margin-Bottom"
                        >
                            <FormControlLabel value="group" control={<Radio />} label="Group" />
                            <FormControlLabel value="individual" control={<Radio />} label="Individual" />
                        </RadioGroup>
                    </div>
                    {/* {user === "group"?
                        <div className="No-Margin-Bottom">
                            <div className="Card-Group">
                                <p className="Small-Margin">Identify a group faciliator who will navigate the application.</p>
                                <TextField placeholder="Group facilitator please enter your name" defaultValue={name} onChange={updateName}/>
                                <p className="Margin-Top No-Margin-Bottom"><span className="Emphasis">{name}</span>, please share your screen with your team.</p>
                            </div>
                            <div className="Card-Group No-Margin-Bottom">
                                <p className="Small-Margin">{name}, does your team have a team name?</p>
                                <TextField placeholder="Please enter your name" defaultValue={groupName} onChange={updateGroupName}/>
                            </div>
                        </div>:
                        <div className="No-Margin-Bottom">
                            <TextField placeholder="Please enter your name" defaultValue={name} onChange={updateName}/>
                            <p className="Margin-Top">Welcome,<span className="Emphasis"> {name}!</span> We're glad you're here.</p>
                        </div>
                    } */}
                </div>
            </div>
        )
    }

    const Modules = () => {

        return(
            <div className="Container Margin-Bottom">
                <p className="Small-Margin">Risky Code contains four modules:</p>
                <ul className="Margin-Bottom">
                    <li><span className="Semi-Bold">Algorithmic Prediction</span> </li>
                    <li><span className="Semi-Bold">Algorithmic Fairness</span></li>
                    <li><span className="Semi-Bold">Stakeholder Mapping</span></li>
                    <li><span className="Semi-Bold">Deliberation</span></li>
                </ul>
                <p className="No-Margin-Bottom">Each module has specific learning outcomes to achieve the overarching goal of <span className="Emphasis">informing and to facilitating deliberation about algorithmically informed decision-making</span>.</p>
            </div>
        )
    }

    const Role = ({user}) => {

        return(
            <div className="Container Margin-Bottom">
                <p>In each module, {user === "group"? "you should imagine your team as a group of:" : "you should imagine yourself as a:"} </p>
                <ul className="Margin-Bottom">
                    <li><span className="Semi-Bold">You</span> — {user === "group"? "busy people who want " : "a busy individual who wants "} to learn more about algorithmic decision-making</li>
                    <li><span className="Semi-Bold">{user === "group"? "Data Scientists" : "Data Scientist"}</span> — interested in algorithmic fairness and equity</li>
                    <li><span className="Semi-Bold">{user === "group"? "Designers" : "Designer"}</span> — interested in bringing design methods to algorithmic decision-making</li>
                    <li><span className="Semi-Bold">{user === "group"? "Public Policymakers" : "Public Policymaker"}</span> — interested in using algorithmic decision-making in equitable and fair ways.</li>
                </ul>
                <p className="No-Margin-Bottom">The goal of the role is to imagine the constraints and decisions a person in that role faces when implementing algorithmic decision-making.</p>
            </div>
        )
    }

    const terminologyExample = () => {

        return(
            <div className="Container Margin-Bottom">
                <p>In the left sidebar you will find a dropdown box called terminology. Terminology specific to algorithmic decision-making is defined in this section.</p>
                <Terminology defaultExpanded={true} margin="No-Margin-Bottom">
                    <Term term={terms.aidm}></Term>
                </Terminology>
            </div>
        )
    }

    const progressExample = () => {

        return(
            <div className="Container Margin-Bottom">
                <p>In the right sidebar you will find a dropdown box called progress. Progress shows where you are in the Risky Code module. You can also use Progress to navigate back to previously completed modules.</p>
                <Progress id="Classify" modules={[]}/>
            </div>
        )
    }

    const steps = [
      {
        label: 'welcome to risky code',
        children: <Welcome/>
      },
      {
        label: 'indicate user type',
        children: userGroup(user, updateUser, name, updateName, groupName, updateGroupName)
      },
      {
        label: 'module overview',
        children: <Modules/>
      },
      {
        label: 'role',
        children: <Role user={user}/>
      },
    //   {
    //     label: 'user interface orientation | terminology',
    //     children: terminologyExample()
    //   },
    //   {
    //     label: 'user interface orientation | progress',
    //     children: progressExample()
    //   }
    ];

  return (
    <div className="Orientation">
        <div className="Container Margin-Bottom">
        <h3>orientation</h3>
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
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    back
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    size="small"
                                    sx={{ mt: 1, mr: 1 }}
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
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Button onClick={routeNext} sx={{ mt: 1, mr: 1 }} variant="contained">
                        continue to algorithmic prediction
                    </Button>
                </Paper>
            )}
            </Box>
        </div>
    </div>
  );
}