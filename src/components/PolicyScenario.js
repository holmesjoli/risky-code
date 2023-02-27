import { TextField } from "@material-ui/core";

export function PolicyScenario({policy, setPolicy}) {

    const updatePolicy = (event) => {
        setPolicy(event.target.value)
    }

    return(
        <div className="No-Margin-Bottom">
            <div className="Container">
                <h3 className="Medium-Margin">policy scenario</h3>
                <TextField placeholder="Add your policy scenario here" variant="outlined" multiline minRows={20} defaultValue={policy} onChange={updatePolicy}/>
            </div>
        </div>
    )
}

export function Consequence() {

    return(
        <div className="No-Margin-Bottom">
            <div className="Container">
                <h3 className="Medium-Margin">consequence</h3>
                <TextField placeholder="Write a reflection on the consequences of using this algorithm in this policy setting" variant="outlined" multiline minRows={12} />
            </div>
        </div>
    )
}

export function Stakeholders() {
    return(
        <div className="Stakeholders Container-Outlined">
            <h3>stakeholders</h3>
            <div className="Column Margin-Bottom">
                <h4>primary</h4>
                <TextField placeholder="Edit me" variant="outlined" multiline={true}/>
            </div>
            <div className="Column Margin-Bottom">
                <h4>secondary</h4>
                <TextField placeholder="Edit me" variant="outlined" multiline={true}/>
            </div>
        </div>
    )
}
