import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Box from "@material-ui/core/Box";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Timer from "../../components/Timer";
import { AlgorithmDefinition } from '../../components/Brainstorm';

export default function PredictionReflection({user, algorithmDefinition, setAlgorithmDefinition, disablePredictionNext, setDisablePredictionNext}) {

    const [activeStep, setActiveStep] = React.useState(0);
    let navigate = useNavigate();

    const routeNext = () => {
        let path = `/Fairness`;
        navigate(path);
    }

    const routeBack = () => {
        let path = `/Optimize`;
        navigate(path);
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const LearningOutcomes = () => {

        return(
            <div className="Container2 Margin-Bottom">
                <p>Define what an algorithm is</p>
                <p className="No-Margin-Bottom">Describe the basic steps of algorithmic prediction</p>
            </div>
        )
    }

    const BrainstormAlgorithm = ({algorithmDefinition, setAlgorithmDefinition}) => {
        return(
            <div className="Container2 Margin-Bottom">
                <p>Would you make any updates to your initial definition of an algorithm?</p>
                <AlgorithmDefinition algorithmDefinition={algorithmDefinition} setAlgorithmDefinition={setAlgorithmDefinition}/>
            </div>
        )
    }

    const Reflect = ({user, disablePredictionNext, setDisablePredictionNext}) => {

        return(
            <Timer user={user} disableNext={disablePredictionNext} setDisableNext={setDisablePredictionNext}>
                <p>Would you collect any other variables to use in the statistical model?</p>
                <p>Were there any rules that didn't fit the statistical model was not able to accomodate?</p>
                    {user==="group"? <p>Were there any rules that one person uses to sort their laundry that are not used by others?</p>: <></>}
                <p className="No-Margin-Bottom">What are the consequences of when Laundry AID made an incorrect prediction?</p>
            </Timer>
        )
    }

    const steps = [
      {
        label: 'learning outcomes',
        children: <LearningOutcomes/>
      },
      {
        label: 'define',
        children: <BrainstormAlgorithm algorithmDefinition={algorithmDefinition} setAlgorithmDefinition={setAlgorithmDefinition}/>
      },
      {
        label: 'reflect',
        children: <Reflect user={user} disablePredictionNext={disablePredictionNext} setDisablePredictionNext={setDisablePredictionNext}/>
      },
    ];

  return (
    <div className="Orientation">
        <div className="Container Margin-Bottom">
        <h3>reflect on algorithmic prediction</h3>
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
                <Button onClick={routeNext} variant="contained">
                    continue to algorithmic fairness
                </Button>
            )}
            </Box>
        </div>
    </div>
  );
}