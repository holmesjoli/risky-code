import { Button } from "@material-ui/core";
import { useNavigate, NavLink } from "react-router-dom";
import * as React from 'react';
import Box from "@material-ui/core/Box";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
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
                <p>Algorithmically informed decision-making tools are now being used in every field. They are used to evaluate prisoners for parole, triage patients in emergency rooms, and predict where and when services might be needed.</p>
                <p className="No-Margin-Bottom"> The second module, <span className="Emphasis Dark Orange">Algorithmic Fairness</span>, will lead you through a series of activities to learn about multiple definitions of algorithmic fairness.</p>
            </div>
        )
    }

    const LearningOutcomes = () => {
        return(
            <div className="Container2 Margin-Bottom">
                <p>Learn that there are many definitions of algorithmic fairness</p>
                <p>Understand that multiple definitions of algorithmic fairness cannot be met simultaneously</p>
                <p className="No-Margin-Bottom">Identify where different definitions of algorithmic fairness may result in disparate impacts</p>
            </div>
        )
    }

    const Define = () => {
        return(
             <div className="Container2 Margin-Bottom">
                <h4 className="Small-Margin">algorithmically informed decision-making</h4>
                <p className="No-Margin-Bottom"><span className="Emphasis">A system that uses automated reasoning to aid or replace a decision-making process that would otherwise be performed by humans <NavLink to="/Resources" className="Purple">(AINOW 2018)</NavLink></span>.</p>
            </div> 
        )
    }

    const COMPAS = () => {
        return(
            <div className="Container2 Margin-Bottom">
                <p>This module will use the COMPAS recidivism algorithm as a case study to visualize how different definitions of algorithmic fairness can result in disparate impacts.</p>
                <p className="No-Margin-Bottom">COMPAS was designed by Equivant to predict whether a defendant will commit another crime if released. It was intended to be used by judges to help decide whether to set bail and release an individual prior to trial and sentencing <NavLink to="/Resources" className="Purple">(Hao and Stray 2019)</NavLink>.</p>
                {/* <p className="No-Margin-Bottom">However, as of 2020, COMPAS is used at additional points in the criminal justice system <NavLink to="/Resources" className="Purple">(Dipshan and Hudgins 2020)</NavLink>.</p> */}
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
      },
      {
        label: 'define',
        children: <Define/>
      },
      {
        label: 'fairness case study',
        children: <COMPAS/>
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
                    <StepLabel className="Purple-Icon">
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
                                    className="Purple"
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
                <Button onClick={routeNext} className="Purple" variant="outlined">
                    continue to algorithmic fairness
                </Button>
            )}
            </Box>
        </div>
    </div>
  );
}