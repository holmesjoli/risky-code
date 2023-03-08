import { useState } from 'react';
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { FormControl, RadioGroup, FormControlLabel, Radio, FormGroup } from '@material-ui/core';

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
        <div className="Start">
            <h3>risky code is designed to be use in a group setting to facilitate discussion and deliberation. however, risky code can also be used by individuals.</h3>
            <div className="Container">
                <FormControl>
                <p>Indicate if you intend to use <span className="Title">Risky Code</span> as a <span className="Emphasis">group</span> or an <span className="Emphasis">individual</span>.</p>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="group"
                        name="radio-buttons-group"
                        onChange={setUser}
                        value={user}
                    >
                        <FormControlLabel value="group" control={<Radio />} label="Group" />
                        <FormControlLabel value="individual" control={<Radio />} label="Individual" />
                    </RadioGroup>
                {user==="group"?<p className="Margin-Top Emphasis">Identify a group leader who will navigate the application.</p>:<></>}
                </FormControl>
            </div>
            <Button variant="outlined" color="secondary" onClick={routeNext}>next</Button>
        </div>
    )
}