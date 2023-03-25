import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Box from "@material-ui/core/Box";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import { RoleStakeholder } from "../../components/Role";
import { BrainstormStakeholders } from "../../components/Brainstorm";

export default function StakeholderMapping({user, brainstormStakeholders, setBrainstormStakeholders}) {

    const [activeStep, setActiveStep] = React.useState(0);
    let navigate = useNavigate();

    const routeNext = () => {
        let path = `/StreetBump`;
        navigate(path);
    }

    const routeBack = () => {
        let path = `/FairnessReflection`;
        navigate(path);
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const Introduction = ({user}) => {
        return(
            <div className="Container2 Margin-Bottom">
                {user==="group"?<p className="No-Margin-Bottom">The third module explores a common design-thinking methodology called <span className="Emphasis LightOrange">Stakeholder Mapping</span>. This section will lead your team through a two stakeholder mapping exercises use different case studies where algorithmically-informed decision-making was implemented.</p>:<p className="No-Margin-Bottom">The third module, <span className="Emphasis">Stakeholder Mapping</span>, explores a common design-thinking methodology called Stakeholder Mapping. This section will lead you through a two stakeholder mapping exercises use different case studies where algorithmically-informed decision-making was implemented.</p>}
            </div>
        )
    }

    const LearningOutcomes = () => {
        return(
            <div className="Container2 Margin-Bottom">
                <p>Be able to define multiple stakeholder groups and explain why these groups are relevant to algorithmic decision-making</p>
                <p className="No-Margin-Bottom">Understand how stakeholder mapping can help to identify different people or groups who are important to consider when implementing an algorithmic system</p>
            </div>
        )
    }

    const Define = () => {
        return (
            <div className="Container2 Margin-Bottom">
                <p><span className="Emphasis">Direct</span> stakeholders are those who directly interact with the algorithmic system</p>
                <p><span className="Emphasis">Indirect</span> stakeholders do not directly interact with the algorithmic system, but are impacted by its use</p>
                <p className="No-Margin-Bottom"><span className="Emphasis">Excluded</span> stakeholders are those who cannot interact with the algorithmic system</p>
            </div>
        )
    }

    const Brainstorm = ({brainstormStakeholders, setBrainstormStakeholders}) => {
        return (
            <div className="Container2 Margin-Bottom">
                <p>Why do you think its important to identify stakeholders?</p>
                <p>When might it be important to conduct stakeholder mapping?</p>
                <BrainstormStakeholders brainstormStakeholders={brainstormStakeholders} setBrainstormStakeholders={setBrainstormStakeholders}/>
            </div>
        )
    }

    const steps = [
      {
        label: 'introduction',
        children: <Introduction user={user}/>
        },
      {
        label: 'learning outcomes',
        children: <LearningOutcomes/>
      },
      {
        label: 'role',
        children: <RoleStakeholder user={user}/>
      },
      {
        label: 'define',
        children: <Define/>
      },
      {
        label: 'brainstorm',
        children: <Brainstorm brainstormStakeholders={brainstormStakeholders} setBrainstormStakeholders={setBrainstormStakeholders}/>
      }
    ];

  return (
    <div className="Orientation">
        <div className="Container Margin-Bottom">
        <h3>introduction to stakeholder mapping</h3>
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
                        continue to stakeholder mapping
                    </Button>
                </Paper>
            )}
            </Box>
        </div>
    </div>
  );
}