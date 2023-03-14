import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { FormControl, RadioGroup, FormControlLabel, Radio, TextField } from '@material-ui/core';
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

export default function Orientation({user, setUser, type, name, setName, groupName, setGroupName}) {
    const [activeStep, setActiveStep] = React.useState(0);
    let navigate = useNavigate();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const updateUser = ev => {
        setUser(ev.target.value);
    }

    const routeNext = () => {
        let path = `/Classify`;
        navigate(path);
    }

    const updateName = (event) => {
        setName(event.target.value)
    };

    const updateGroupName = (event) => {
        setGroupName(event.target.value)
    };

    const userGroup = (user, updateUser, name, setName, groupName, setGroupName) => {
        return(
            <div>
                <div className="Card-Group">
                    <p>Indicate how you intend to use Risky Code.</p>
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
                {user === "group"?
                <div>
                    <div className="Card-Group">
                        <p>Please identify a group faciliator who will navigate the application. </p>
                        <TextField placeholder="Group facilitator please enter your name" defaultValue={name} onChange={updateName}/>
                        <p className="Margin-Top No-Margin-Bottom">{name}, please share your screen.</p>
                    </div>
                    <div className="Card-Group">
                        <p>{name}, does your team have a team name?</p>
                        <TextField placeholder="Please enter your name" defaultValue={groupName} onChange={updateGroupName}/>
                    </div>
                </div>:
                <div>
                    <p className="Margin-Top">Welcome {}</p>
                </div>}
            </div>
        )
    }

    const role = (type) => {

        return(
            <div>
                <p>Risky Code contains four modules <span className="Emphasis">Algorithmic Prediction</span>, <span className="Emphasis">Algorithmic Fairness</span>, <span className="Emphasis">Case Studies</span>, and <span className="Emphasis">Deliberation</span>. In each of these modules {type}</p>
                <ul>
                    <li><span className="Semi-Bold">Algorithmic Prediction</span> — <span className="Emphasis">You</span>, a busy individual who wants to learn more about algorithmic decision-making</li>
                    <li><span className="Semi-Bold">Algorithmic Fairness</span> — A socially aware <span className="Emphasis">data scientist</span>.</li>
                    <li><span className="Semi-Bold">Case Studies</span> — A socially aware <span className="Emphasis">designer</span> interested in bring design methods to algorithmic decision-making.</li>
                    <li><span className="Semi-Bold">Deliberation</span> — A <span className="Emphasis">public policymaker</span> interested in using algorithmic decision-making.</li>
                </ul>
                <p>Don't worry you won't have to remember these roles!</p>
            </div>
        )
    }

    const terminologyExample = () => {

        return(
            <Terminology defaultExpanded={true}  margin="Margin-Bottom">
                <Term term={terms.aidm}></Term>
            </Terminology>
        )
    }

    const progressExample = () => {

        return(
            <Progress id="Classify" modules={[]}/>
        )
    }

    const steps = [
      {
        label: 'welcome to risky code',
        description: `Risky Code is an interactive digital toolkit designed to inform and to facilitate deliberation about algorithmically informed decision-making.`
      },
      {
        label: 'indicate user type',
        description: 'Risky Code is designed to be used in a small group setting (approximately three to six people) to facilitate discussion and deliberation. Individuals are also encouraged to try Risky Code, however, the experience is designed to differ slightly.',
        children: userGroup(user, setUser, name, setName, groupName, setGroupName)
      },
      {
        label: 'role',
        description: ``,
        children: role(type)
      },
      {
        label: 'user interface orientation | terminology',
        description: `In the left sidebar you will find a dropdown box called terminology. Terminology specific to algorithmic decision-making is defined in this section.`,
        children: terminologyExample()
      },
      {
        label: 'user interface orientation | progress',
        description: `In the right sidebar you will dind a dropdown box called progress. Progress shows where you are in the Risky Code module. You can also use Progress to navigate back to previously completed modules.`,
        children: progressExample()
      }
    ];

  return (
    <div className="Risky Code Orientation">
        <div className="Container Margin-Bottom">
        <h3>orientation</h3>
            <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                <Step key={step.label}>
                    <StepLabel>
                    <h4 className="Small-Margin">{step.label}</h4>
                    </StepLabel>
                    <StepContent>
                        <p>{step.description}</p>
                        {step.children}                      
                        <Box sx={{ mb: 2 }}>
                            <div className="Row">
                                <Button
                                    size="small"
                                    variant="outlined" 
                                    color="secondary"
                                    disabled={index === 0}
                                    onClick={handleBack}
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
                                    {index === steps.length - 1 ? 'finish' : 'continue'}
                                </Button>
                            </div>
                        </Box>
                    </StepContent>
                </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <p>Let's get started!</p>
                    <Button onClick={routeNext} sx={{ mt: 1, mr: 1 }} variant="contained">
                        next
                    </Button>
                </Paper>
            )}
            </Box>
        </div>
    </div>
  );
}