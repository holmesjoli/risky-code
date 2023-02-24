import { TextField } from "@material-ui/core";

export default function Stakeholders() {
    return(
        <div className="Stakeholders Container-Outlined">
            <h3>stakeholders</h3>
            <div className="Margin-Bottom Column">
                <h4>direct</h4>
                <TextField placeholder="edit me" variant="outlined" multiline={true}/>
            </div>
            <div className="No-Margin-Bottom Column">
                <h4>indirect</h4>
                <TextField placeholder="edit me" variant="outlined" multiline={true}/>
            </div>
        </div>
    )
}