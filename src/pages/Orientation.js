import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import * as React from 'react';
import Box from "@material-ui/core/Box";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

const steps = ['User', 'Terminology', 'Progress'];

export default function Orientation({user, updateUser}) {

    const setUser = ev => {
        updateUser(ev.target.value);
    }

    let navigate = useNavigate(); 
    const routeNext = () => {
      let path = `/Introduction`;
      navigate(path);
    }

    return(
        <div className="Orientation">
            <div className="Container Margin-Bottom">
                <FormControl>
                <h3>risky code orientation</h3>
                <p className="Margin-Bottom">Risky Code is designed to be use in a small group setting (approximately three to six people) to facilitate discussion and deliberation. Individuals are also encouraged to try Risky Code, the experience is designed to differ slightly.</p>
                {/* <div className="Card-Group"> */}
                    <h4 className="No-Margin-Bottom">indicate how you intend to use risky code</h4>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="group"
                        name="radio-buttons-group"
                        onChange={setUser}
                        value={user}
                        className="Margin"
                    >
                        <FormControlLabel value="group" control={<Radio />} label="Group" />
                        <FormControlLabel value="individual" control={<Radio />} label="Individual" />
                    </RadioGroup>
                    {user === "group"?<p className="Margin-Top">First, identify a group faciliator who will navigate the application. Group faciliator, please share your screen. Great, let's get started! Click <span className="Emphasis">Next</span> to begin.</p>:<p>Welcome, we're happing you're here! Click <span className="Emphasis">Next</span> to begin.</p>}
                </FormControl>
                <Button variant="outlined" color="secondary" onClick={routeNext}>next</Button>
            </div>
        </div>
    )
}

// export default function Orientation() {
//   const [activeStep, setActiveStep] = React.useState(0);
//   const isStepOptional = (step) => {
//     return step === 1;
//   };

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Stepper activeStep={activeStep}>
//         {steps.map((label, index) => {
//           const stepProps = {};
//           const labelProps = {};
//           if (isStepOptional(index)) {
//             labelProps.optional = (
//               <Typography variant="caption">Optional</Typography>
//             );
//           }

//           return (
//             <Step key={label} {...stepProps}>
//               <StepLabel {...labelProps}>{label}</StepLabel>
//             </Step>
//           );
//         })}
//       </Stepper>
//       {activeStep === steps.length ? (
//         <React.Fragment>
//           <Typography sx={{ mt: 2, mb: 1 }}>
//             All steps completed - you&apos;re finished
//           </Typography>
//           <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//             <Box sx={{ flex: '1 1 auto' }} />
//             <Button onClick={handleReset}>Reset</Button>
//           </Box>
//         </React.Fragment>
//       ) : (
//         <React.Fragment>
//           <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
//           <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//             <Button
//               color="inherit"
//               disabled={activeStep === 0}
//               onClick={handleBack}
//               sx={{ mr: 1 }}
//             >
//               Back
//             </Button>
//             <Box sx={{ flex: '1 1 auto' }} />
//             <Button onClick={handleNext}>
//               {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//             </Button>
//           </Box>
//         </React.Fragment>
//       )}
//     </Box>
//   );
// }
