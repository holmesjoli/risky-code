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
                <p>The first module, <span className="Semi-Bold Pink">Algorithmic Prediction</span>, will lead you through a series of activities to learn about how algorithmic prediction works.</p>
                <p>The basic steps to algorithmic prediction are: </p>
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
        <h3>introduction to algorithmic prediction</h3>
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