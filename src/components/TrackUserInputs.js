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

export function Consequence({margin}) {

    return(
        <div className={"Consequence " + margin}>
            <div className="Container">
                <h3 className="Small-Margin">reflect</h3>
                    <p>Reflect on the consequences (positive and negative) of using algorithmically informed decision-making in this policy setting</p>
                <div className="Margin-Bottom" >
                    <h4 className="Small-Margin">positive consequences</h4>
                <TextField placeholder="write reflection" variant="outlined" multiline minRows={5} />
                </div>
                <div>
                    <h4 className="Small-Margin">negative consequences</h4>
                    <TextField placeholder="write reflection" variant="outlined" multiline minRows={5} />
                </div>
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
