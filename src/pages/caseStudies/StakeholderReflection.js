import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Box from "@material-ui/core/Box";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Timer from "../../components/Timer";

export default function StakeholderReflection({user, disableStakeholder, setDisableStakeholder}) {

    const [activeStep, setActiveStep] = React.useState(0);
    let navigate = useNavigate();

    const routeNext = () => {
        let path = `/Deliberation`;
        navigate(path);
    }

    const routeBack = () => {
        let path = `/StreetBump`;
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
                {user==="group"? <p>Did your team think of any stakeholders which you hadn't considered before?</p>: <p>Did you think of any stakeholders which you hadn't considered before?</p>}
                <p>How did the stakeholders' values align or diverge?</p>
                <p className="No-Margin-Bottom">Is it important to consider all stakeholders' values equally?</p>
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
        <h3>reflect on stakeholder mapping</h3>
            <Box sx={{ width: 500 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                <Step key={step.label}>
                    <StepLabel className="LightOrange-Icon">
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
                                    className="LightOrange" 
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
                <Button onClick={routeNext} className="Yellow" variant="outlined">
                    continue to deliberation
                </Button>
            )}
            </Box>
        </div>
    </div>
  );
}