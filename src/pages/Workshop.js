import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

export default function Workshop({user, updateUser}) {

    const setUser = ev => {
        updateUser(ev.target.value);
    }

    let navigate = useNavigate(); 
    const routeNext = () => {
      let path = `/Introduction`;
      navigate(path);
    }

    return(
        <div className="Workshop">
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
                    {user === "group"?<p className="Margin-Top">First, identify a group leader who will facilitate the discussion and navigate the application. Group leader, please share your screen. Great, let's get started! Click <span className="Emphasis">Next</span> to begin.</p>:<p>Welcome, we're happing you're here! Click <span className="Emphasis">Next</span> to begin.</p>}
                </FormControl>
                <Button variant="outlined" color="secondary" onClick={routeNext}>next</Button>
            </div>
        </div>
    )
}