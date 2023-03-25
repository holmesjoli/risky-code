import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Box from "@material-ui/core/Box";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import { RoleDeliberation } from "../../components/Role";
import { BrainstormAlgorithmicDecisionMaking } from "../../components/Brainstorm"

export default function Deliberation({user, algorithmicBrainstorm, setAlgorithmicBrainstorm}) {

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
                <p>For example, in the <span className="Semi-Bold DarkOrange"> Algorithmic Fairness </span> module we looked at the COMPAS case study. COMPAS is likely a higher risk use case. In the <span className="Semi-Bold LightOrange"> Stakeholder Mapping</span> module we looked at the Street Bump example. Street Bump is likely a lower risk use case.</p>
                <p className="No-Margin-Bottom">The goal of this module, <span className="Semi-Bold Yellow">Deliberation</span> is to visually assess risk across numerous dimensions to answer the question, <span className="Italic">is it appropriate to use algorithmic decision-making for my specific public policy use case?</span></p>
            </div>
        )
    }

    const Brainstorm = () => {
        return(
            <BrainstormAlgorithmicDecisionMaking algorithmicBrainstorm={algorithmicBrainstorm} setAlgorithmicBrainstorm={setAlgorithmicBrainstorm}>
                <p>Do you think algorithmic decision-making should be used to inform all types of policy decisions? Why or why not?</p>
                <p >Do you think algorithmic decision-making is more risky in certain scenarios?</p>
            </BrainstormAlgorithmicDecisionMaking>
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
      {
        label: 'brainstorm',
        children: <Brainstorm/>
      }
    ];

  return (
    <div className="Orientation">
        <div className="Container Margin-Bottom">
        <h3>introduction to deliberation</h3>
            <Box sx={{ width: 500 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                <Step key={step.label}>
                    <StepLabel className="Yellow-Icon">
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
                    continue to deliberation
                </Button>
            )}
            </Box>
        </div>
    </div>
  );
}
