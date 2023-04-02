import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Box from "@material-ui/core/Box";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import { BrainstormAlgorithm, BrainstormLaundryRules } from "../../components/Brainstorm";
import { RolePrediction } from "../../components/Role";

export default function Algorithm({user, algorithmDefinition, setAlgorithmDefinition, rules, setRules}) {

    const [activeStep, setActiveStep] = React.useState(0);
    let navigate = useNavigate();

    const routeNext = () => {
        let path = `/Classify`;
        navigate(path);
    }

    const routeBack = () => {
        let path = `/Orientation`;
        navigate(path);
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const Introduction = () => {

        return(
            <div className="Container2 Margin-Bottom">
                <p>This module will walk through the basic steps of algorithmic prediction:</p>
                <ul className="No-Margin-Bottom">
                    <li className="Small-Margin Emphasis">Data collection and classification</li>
                    <li className="Small-Margin Emphasis">Model Training</li>
                    <li className="Small-Margin Emphasis">Model Optimization</li>
                    <li className="Small-Margin Emphasis">Model Testing</li>
                </ul>
            </div>
        )
    }

    const LearningOutcomes = () => {

        return(
            <div className="Container2 Margin-Bottom">
                <p>Define what an algorithm is</p>
                <p className="No-Margin-Bottom">Describe the basic steps of algorithmic prediction</p>
            </div>
        )
    }

    const steps = [
      {
        label: 'introduction',
        children: <Introduction/>
        },
      {
        label: 'learning outcomes',
        children: <LearningOutcomes/>
      },
      {
        label: 'role',
        children: <RolePrediction user={user}/>
      },
      {
        label: 'brainstorm',
        children: <BrainstormAlgorithm algorithmDefinition={algorithmDefinition} setAlgorithmDefinition={setAlgorithmDefinition}/>
      },
      {
        label: 'conceptualize',
        children: <BrainstormLaundryRules rules={rules} setRules={setRules}/>
      },
    ];

  return (
    <div className="Orientation">
        <div className="Container Margin-Bottom">
        <h2>algorithmic prediction</h2>
            <Box sx={{ width: 500 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                <Step key={step.label}>
                    <StepLabel className="Purple-Icon">
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
                                    className="Purple" 
                                    variant="outlined"
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