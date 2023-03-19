import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
// import { RadioGroup, FormControlLabel, Radio, TextField } from '@material-ui/core';
import * as React from 'react';
import Box from "@material-ui/core/Box";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import { BrainstormAlgorithm, BrainstormLaundryRules } from "../../components/Brainstorm";
// import { Terminology, Term } from "../components/Sidebar";
// import { terms } from '../utils/global';

export default function Algorithm({algorithmDefinition, setAlgorithmDefinition, rules, setRules}) {

    const [activeStep, setActiveStep] = React.useState(0);
    let navigate = useNavigate();

    const routeNext = () => {
        let path = `/Classify`;
        navigate(path);
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const learningOutcomes = () => {

        return(
                <ul className="Margin-Bottom">
                    <li>Define what an algorithm is</li>
                    <li>Describe the basic steps of algorithmic prediction</li>
                </ul>
        )
    }

    const steps = [
      {
        label: 'learning outcomes',
        children: learningOutcomes()
      },
      {
        label: 'role',
        description: `This module will first establish a baseline knowledge of what an algorithm is. Then the module will walk through three steps of algorithmic prediction — Classify, Train, and Optimize.`
      },
      {
        label: 'what is an algorithm?',
        description: 'How do you define the term algorithm?',
        children: BrainstormAlgorithm(algorithmDefinition, setAlgorithmDefinition)
      },
      {
        label: 'risky code\'s definition',
        description: `This project defines an algorithm as a series of steps that allow you to perform a particular task. The analogy used in this module is laundry. What are some rules you use to sort laundry for a hot water load?`,
        children: BrainstormLaundryRules(rules, setRules)
      },
      {label: 'steps of algorithmic prediction',
        // description: `In the left sidebar you will find a dropdown box called terminology. Terminology specific to algorithmic decision-making is defined in this section.`,
        // children: terminologyExample()
      },
    //   {
    //     label: 'discuss',
    //     description: `In the right sidebar you will dind a dropdown box called progress. Progress shows where you are in the Risky Code module. You can also use Progress to navigate back to previously completed modules.`,
    //     children: progressExample()
    //   }
    ];

  return (
    <div className="Orientation">
        <div className="Container Margin-Bottom">
        <h3>introduction to algorithmic prediction</h3>
            <Box sx={{ width: 500 }}>
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
                        get started
                    </Button>
                </Paper>
            )}
            </Box>
        </div>
    </div>
  );
}