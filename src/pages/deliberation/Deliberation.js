import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Box from "@material-ui/core/Box";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import { RoleDeliberation } from "../../components/Role";

export default function Deliberation({user}) {

    const [activeStep, setActiveStep] = React.useState(0);
    let navigate = useNavigate();

    const routeNext = () => {
        let path = `/Policy`;
        navigate(path);
    }

    const routeBack = () => {
        let path = `/StakeholderReflection`;
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
                <p>Many algorithms intervening in public policy decisions are considered high-stakes decision-making cases (e.g., predict child maltreatment, automated recruitment decisions, college admissions), but not all are.</p>
                <p>For example, in the <span className="Algorithmic Fairness"> module we looked at the COMPAS case study. COMPAS is likely a higher risk use case. In the <span className="Stakeholder Mapping"> mdouel we looked at the Street Bump example. Street Bump is likely a lower risk use case. </span></span></p>
                <p>The goal of this module is to visually assess risk across numerous dimensions to answer the question, <span className="Italic">is it appropriate to use algorithmic decision-making for my specific public policy use case?</span></p>
            </div>
        )
    }


    const LearningOutcomes = () => {

        return(
            <div className="Container2 Margin-Bottom">
                <p>Learn different metrics to consider when if an algorithm should be used in a public policy setting</p>
                <p>Consider different stakeholders and their individual risks</p>
                <p className="No-Margin-Bottom">Visually analyze an algorithm's risk</p>
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
        children: <RoleDeliberation user={user}/>
      },
    //   {
    //     label: 'brainstorm',
    //     children: <BrainstormAlgorithm algorithmDefinition={algorithmDefinition} setAlgorithmDefinition={setAlgorithmDefinition}/>
    //   },
    //   {
    //     label: 'conceptualize',
    //     children: <BrainstormLaundryRules rules={rules} setRules={setRules}/>
    //   },
    ];

  return (
    <div className="Orientation">
        <div className="Container Margin-Bottom">
        <h3>introduction to deliberation</h3>
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
