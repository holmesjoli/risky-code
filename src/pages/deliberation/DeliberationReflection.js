import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Box from "@material-ui/core/Box";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Timer from "../../components/Timer";
import { NextButtonOrientation } from "../../components/Button";

export default function DeliberationReflection({user, disableDeliberation, setDeliberation}) {

    const [activeStep, setActiveStep] = React.useState(0);
    let navigate = useNavigate();

    const routeBack = () => {
        let path = `/Risk`;
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
                <p>Consider different risk metrics about algorithmically-informed decsion-making</p>
                <p>Analyze different stakeholders and their individual risks</p>
                <p className="No-Margin-Bottom">Visually analyze an algorithm's risk</p>
            </div>
        )
    }

    const Reflect = ({user, disableDeliberation, setDeliberation}) => {
        return(
            <Timer user={user} disableNext={disableDeliberation} setDisableNext={setDeliberation} className="Yellow">
                <p>Do you think algorithmically informed decision-making should be used in your policy scenario?</p>
                <p className="No-Margin-Bottom">What do you think of algorithmically informed decision-making after this workshop? Did any of your views change?</p>
            </Timer>
        )
    }

    const steps = [
      {
        label: 'learning outcomes',
        children: <LearningOutcomes/>,
        disable: false
      },
      {
        label: 'reflect',
        children: <Reflect user={user} disableDeliberation={disableDeliberation} setDeliberation={setDeliberation}/>,
        disable: disableDeliberation
      },
    ];

  return (
    <div className="Orientation">
        <div className="Container Margin-Bottom">
        <h3>deliberation</h3>
            <Box sx={{ width: 500 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                <Step key={step.label}>
                    <StepLabel className="DarkOrange-Icon">
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
                                <NextButtonOrientation className="Yellow" routeNext={handleNext} disabled={step.disable}/>
                            </div>
                        </Box>
                    </StepContent>
                </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <div className="Semi-Bold">Congrats you've reached the end. Thank you for participating!</div>
                // <Button onClick={routeNext} className="Yellow" variant="outlined">
                //     continue to stakeholder mapping
                // </Button>
            )}
            </Box>
        </div>
    </div>
  );
}