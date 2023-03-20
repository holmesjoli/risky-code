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
import { RoleFairness } from "../../components/Role";

export default function Fairness({user}) {

    const [activeStep, setActiveStep] = React.useState(0);
    let navigate = useNavigate();

    const routeNext = () => {
        let path = `/COMPAS`;
        navigate(path);
    }

    const routeBack = () => {
        let path = `/PredictionReflection`;
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
                <p>The second module, <span>Algorithmic Fairness</span>, will lead you through a series of activities to learn about how algorithmic prediction works.</p>
                <p>The basic steps to algorithmic prediction are: </p>
                {/* <ul className="No-Margin-Bottom">
                    <li className="Semi-Bold">Data collection and classification</li>
                    <li className="Semi-Bold">Model Training</li>
                    <li className="Semi-Bold">Model Optimization</li>
                    <li className="Semi-Bold">Model Testing</li>
                </ul> */}
            </div>
        )
    }

    const LearningOutcomes = () => {

        return(
            <div className="Container2 Margin-Bottom">
                <p>Understand that multiple definitions of algorithmic fairness cannot be met simultaneously</p>
                <p className="No-Margin-Bottom">Understand the definitions of algorithmic fairness may result in disparate impacts</p>
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
        children: <RoleFairness user={user}/>
      }
    ];

  return (
    <div className="Orientation">
        <div className="Container Margin-Bottom">
        <h3>introduction to algorithmic fairness</h3>
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
                        continue to algorithmic fariness
                    </Button>
                </Paper>
            )}
            </Box>
        </div>
    </div>
  );
}