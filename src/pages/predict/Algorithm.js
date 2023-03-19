import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Box from "@material-ui/core/Box";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import { BrainstormAlgorithm, BrainstormLaundryRules } from "../../components/Brainstorm";
import { RolePrediction } from "../../components/Role";

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
            <div className="Container Margin-Bottom">
                <p>Define what an algorithm is</p>
                <p className="No-Margin-Bottom">Describe the basic steps of algorithmic prediction</p>
            </div>
        )
    }

    const steps = [
      {
        label: 'learning outcomes',
        children: learningOutcomes()
      },
      {
        label: 'role: you',
        children: RolePrediction()
      },
      {
        label: 'what is an algorithm?',
        children: BrainstormAlgorithm(algorithmDefinition, setAlgorithmDefinition)
      },
      {
        label: 'risky code\'s definition',
        children: BrainstormLaundryRules(rules, setRules)
      },
      {
        label: 'steps of algorithmic prediction',
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