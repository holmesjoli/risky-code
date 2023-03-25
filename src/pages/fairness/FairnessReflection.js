import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Box from "@material-ui/core/Box";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Timer from "../../components/Timer";

export default function FairnessReflection({user, disableFairnessNext, setDisableFairnessNext}) {

    const [activeStep, setActiveStep] = React.useState(0);
    let navigate = useNavigate();

    const routeNext = () => {
        let path = `/StakeholderMapping`;
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
            <div className="Container2 Margin-Bottom">
                <p>Learn that there are many definitions of algorithmic fairness</p>
                <p>Understand that multiple definitions of algorithmic fairness cannot be met simultaneously</p>
                <p className="No-Margin-Bottom">Identify where different definitions of algorithmic fairness may result in disparate impacts</p>
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
                    continue to stakeholder mapping
                </Button>
            )}
            </Box>
        </div>
    </div>
  );
}