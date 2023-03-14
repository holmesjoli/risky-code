import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import * as React from 'react';
import Box from "@material-ui/core/Box";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import { Terminology, Term } from "../components/Sidebar";
import { terms } from '../utils/global';

export default function Orientation({user, updateUser}) {
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

    const setUser = ev => {
        updateUser(ev.target.value);
    }

    const routeNext = () => {
        let path = `/Classify`;
        navigate(path);
    }

    const userGroup = (user, setUser) => {
        return(
            <div>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    // defaultValue="group"
                    name="radio-buttons-group"
                    onChange={setUser}
                    value={user}
                    className="Margin"
                >
                    <FormControlLabel value="group" control={<Radio />} label="Group" />
                    <FormControlLabel value="individual" control={<Radio />} label="Individual" />
                </RadioGroup>   
                {user === "group"?<p className="Margin-Top">First, identify a group faciliator who will navigate the application. Group faciliator, please share your screen. Great, let's get started! Click <span className="Emphasis">Next</span> to begin.</p>:<p>Welcome, we're happing you're here! Click <span className="Emphasis">Next</span> to begin.</p>}
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
    
    const steps = [
      {
        label: 'welcome to risky code',
        description: `Risky Code is an interactive digital toolkit designed to inform and to facilitate deliberation about algorithmically informed decision-making.`,
      },
      {
        label: 'indicate user type',
        description: 'Risky Code is designed to be use in a small group setting (approximately three to six people) to facilitate discussion and deliberation. Individuals are also encouraged to try Risky Code, the experience is designed to differ slightly. Please indicate how you intend to use Risky Code.',
        children: userGroup(user, setUser)
      },
      {
        label: 'modules',
        description: `Risky Code contains four modules Predict, Fairness, Case Studies, Deliberation.`,
      },
      {
        label: 'user interface orientation | terminology',
        description: `In the left sidebar you will find a dropdown box called terminology. Terminology specific to algorithmic decision-making is defined in this section.`,
        children: terminologyExample()
      },
      {
        label: 'user interface orientation | progress',
        description: `In the right sidebar you will dind a dropdown box called progress. Progress shows where you are in the Risky Code module. You can also use Progress to navigate back to previously completed modules.`,
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
                        {/* <div>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                // defaultValue="group"
                                name="radio-buttons-group"
                                onChange={setUser}
                                value={user}
                                className="Margin"
                            >
                                <FormControlLabel value="group" control={<Radio />} label="Group" />
                                <FormControlLabel value="individual" control={<Radio />} label="Individual" />
                            </RadioGroup>   
                            {user === "group"?<p className="Margin-Top">First, identify a group faciliator who will navigate the application. Group faciliator, please share your screen.</p>:<></>}
                        </div> */}
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