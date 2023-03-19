import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Box from "@material-ui/core/Box";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import Timer from "../../components/Timer";
import { AlgorithmDefinition } from '../../components/Brainstorm';

export default function FairnessReflection({user, disableFairnessNext, setDisableFairnessNext}) {

    const [activeStep, setActiveStep] = React.useState(0);
    let navigate = useNavigate();

    const routeNext = () => {
        let path = `/Stakeholders`;
        navigate(path);
    }

    const routeBack = () => {
        let path = `/Error`;
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
            <div className="Container Margin-Bottom">
                <p>Understand that multiple definitions of algorithmic fairness cannot be met simultaneously</p>
                <p className="No-Margin-Bottom">Understand the definitions of algorithmic fairness may result in disparate impacts</p>
            </div>
        )
    }

    const BrainstormImpossibility = ({algorithmDefinition, setAlgorithmDefinition}) => {
        return(
            <div className="Container2">
                <p>Would you make any updates to your initial definition of an algorithm?</p>
                <AlgorithmDefinition algorithmDefinition={algorithmDefinition} setAlgorithmDefinition={setAlgorithmDefinition}/>
            </div>
        )
    }

    const Reflect = ({user, disableFairnessNext, setDisableFairnessNext}) => {

        return(
            <Timer user={user} disableNext={disableFairnessNext} setDisableNext={setDisableFairnessNext}>
                <p>Do you agree with ProPublica that the COMPAS recidivism algorithm is biased?</p>
                <p>Can you think of any problems with using a proxy variable in this type of algorithmic decision-making?</p>
                <p className="No-Margin-Bottom">When may it be optimal to use different types of mathematical fairness?</p>
            </Timer>
        )
    }

    const steps = [
      {
        label: 'learning outcomes',
        children: <LearningOutcomes/>
      },
    //   {
    //     label: 'define',
    //     children: <BrainstormAlgorithm algorithmDefinition={algorithmDefinition} setAlgorithmDefinition={setAlgorithmDefinition}/>
    //   },
      {
        label: 'reflect',
        children: <Reflect user={user} disableFairnessNext={disableFairnessNext} setDisableFairnessNext={setDisableFairnessNext}/>
      },
    ];

  return (
    <div className="Orientation">
        <div className="Container Margin-Bottom">
        <h3>reflect on algorithmic fairness</h3>
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
                        continue to algorithmic fairness
                    </Button>
                </Paper>
            )}
            </Box>
        </div>
    </div>
  );
}