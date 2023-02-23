import { TextField } from "@material-ui/core";

export default function Stakeholders() {
    return(
        <div className="Stakeholders Container-Outlined Margin-Top">
            <h3>stakeholders</h3>
            <div className="Margin-Bottom Column">
                <h5>direct</h5>
                <TextField placeholder="edit me" variant="outlined" multiline={true}/>
            </div>
            <div className="No-Margin-Bottom Column">
                <h5>indirect</h5>
                <TextField placeholder="edit me" variant="outlined" multiline={true}/>
            </div>
        </div>
    )
}