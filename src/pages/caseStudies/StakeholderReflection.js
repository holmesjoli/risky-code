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

export default function StakeholderReflection({user, disableStakeholder, setDisableStakeholder}) {

    const [activeStep, setActiveStep] = React.useState(0);
    let navigate = useNavigate();

    const routeNext = () => {
        let path = `/Health`;
        navigate(path);
    }

    const routeBack = () => {
        let path = `/Deliberation`;
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
                <p>Be able to define multiple stakeholder groups and explain why these groups are relevant to algorithmic decision-making</p>
                <p className="No-Margin-Bottom">Understand how stakeholder mapping can help to identify different people or groups who are important to consider when implementing an algorithmic system</p>
            </div>
        )
    }

    const Reflect = ({user, disableStakeholder, setDisableStakeholder}) => {

        return(
            <Timer user={user} disableNext={disableStakeholder} setDisableNext={setDisableStakeholder}>
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
        label: 'reflect',
        children: <Reflect user={user} disableStakeholder={disableStakeholder} setDisableStakeholder={setDisableStakeholder}/>
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
                        continue to deliberation
                    </Button>
                </Paper>
            )}
            </Box>
        </div>
    </div>
  );
}