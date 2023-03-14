import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import * as React from 'react';
import Box from "@material-ui/core/Box";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import { Pagination, PaginationItem } from '@material-ui/lab/';

// const steps = ['User', 'Terminology', 'Progress'];

// export default function Orientation({user, updateUser}) {

//     const setUser = ev => {
//         updateUser(ev.target.value);
//     }

//     let navigate = useNavigate(); 
//     const routeNext = () => {
//       let path = `/Introduction`;
//       navigate(path);
//     }

//     return(
//         <div className="Orientation">
//             <div className="Container Margin-Bottom">
//                 <FormControl>
//                 <h2>risky code orientation</h2>
//                 <h3>welcome to <span className="Emphasis">risky code</span></h3>
//                 <p className="Margin-Bottom"><span className="Emphasis">Risky Code</span> is designed to be use in a small group setting (approximately three to six people) to facilitate discussion and deliberation. Individuals are also encouraged to try <span className="Emphasis">Risky Code</span>, the experience is designed to differ slightly.</p>
//                 {/* <div className="Card-Group"> */}
//                     <h4 className="No-Margin-Bottom">indicate how you intend to use risky code</h4>
//                     <RadioGroup
//                         aria-labelledby="demo-radio-buttons-group-label"
//                         // defaultValue="group"
//                         name="radio-buttons-group"
//                         onChange={setUser}
//                         value={user}
//                         className="Margin"
//                     >
//                         <FormControlLabel value="group" control={<Radio />} label="Group" />
//                         <FormControlLabel value="individual" control={<Radio />} label="Individual" />
//                     </RadioGroup>   
//                     {user === "group"?<p className="Margin-Top">First, identify a group faciliator who will navigate the application. Group faciliator, please share your screen. Great, let's get started! Click <span className="Emphasis">Next</span> to begin.</p>:<p>Welcome, we're happing you're here! Click <span className="Emphasis">Next</span> to begin.</p>}
//                 </FormControl>
//                 {/* <Button variant="outlined" color="secondary" onClick={routeNext}>next</Button> */}
//                 {/* <Pagination count={3} variant="outlined" size="small" shape="rounded" color="primary" /> */}
//             </div>
//         </div>
//     )
// }

const steps = [
  {
    label: 'welcome to risky code',
    description: `Risky Code is an interactive digital toolkit designed to inform and to facilitate deliberation about algorithmically informed decision-making.`,
  },
  {
    label: 'indicate user type',
    description: 'Risky Code is designed to be use in a small group setting (approximately three to six people) to facilitate discussion and deliberation. Individuals are also encouraged to try Risky Code, the experience is designed to differ slightly. Please indicate how you intend to use Risky Code.',
  },
  {
    label: 'user interface orientation',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

export default function Orientation({user, updateUser}) {
    const [activeStep, setActiveStep] = React.useState(0);
    let navigate = useNavigate();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const setUser = ev => {
        updateUser(ev.target.value);
    }

    const routeNext = () => {
        let path = `/Classify`;
        navigate(path);
    }

  return (
    <div className="Risky Code Orientation">
        <div className="Container Margin-Bottom">
        <h3>orientation</h3>
            <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                <Step key={step.label}>
                    <StepLabel>
                    <h4 className="Small-Margin">{step.label}</h4>
                    </StepLabel>
                    <StepContent>
                        <p>{step.description}</p>
                        <Box sx={{ mb: 2 }}>
                            <div>
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                size="small"
                                sx={{ mt: 1, mr: 1 }}
                            >
                                {index === steps.length - 1 ? 'finish' : 'continue'}
                            </Button>
                            <Button
                                size="small"
                                variant="outlined" 
                                color="secondary"
                                disabled={index === 0}
                                onClick={handleBack}
                                sx={{ mt: 1, mr: 1 }}
                            >
                                back
                            </Button>
                            </div>
                        </Box>
                    </StepContent>
                </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <p>Let's get started!</p>
                <Button onClick={routeNext} sx={{ mt: 1, mr: 1 }} variant="contained">
                    next
                </Button>
                </Paper>
            )}
            </Box>
        </div>
    </div>
  );
}