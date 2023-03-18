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

export function AlgorithmDefinition({algorithmDefinition, setAlgorithmDefinition, children}) {

    const updateAlgorithmDefinition = (event) => {
        setAlgorithmDefinition(event.target.value)
    }

    return(
        <div className="No-Margin-Bottom Card-Group">
            <h3 className="Small-Margin">conceptualize</h3>
            {children}
            <TextField placeholder="add your definition here" variant="outlined" multiline={true} minRows={8} defaultValue={algorithmDefinition} onChange={updateAlgorithmDefinition}/>
        </div>
    )
}

export function BaseRates({baseRatesBrainstorm, setBaseRatesBrainstorm, children}) {

    const updateBaseRates = (event) => {
        setBaseRatesBrainstorm(event.target.value)
    }

    return(
        <div className="No-Margin-Bottom Card-Group">
            <h3 className="Small-Margin">brainstorm</h3>
            {children}
            <TextField placeholder="add your brainstorm here" variant="outlined" multiline={true} minRows={8} defaultValue={baseRatesBrainstorm} onChange={updateBaseRates}/>
        </div>
    )
}
export function LaundryRules({user, rules, setRules, children}) {

    const updateRule1 = (event) => {
        rules.rule1 = event.target.value;
        setRules(rules);
    }

    const updateRule2 = (event) => {
        rules.rule2 = event.target.value;
        setRules(rules);
    }

    const updateRule3 = (event) => {
        rules.rule3 = event.target.value;
        setRules(rules);
    }

    return(
        <div>
            <div className="No-Margin-Bottom Container">
                <h3 className="Medium-Margin">conceptualize</h3>
                {children}
                <div className="Margin-Bottom">
                    <TextField placeholder="add rule" variant="outlined" onChange={updateRule1} defaultValue={rules.rule1}/>
                </div>
                <div className="Margin-Bottom">
                    <TextField placeholder="add rule" variant="outlined" onChange={updateRule2} defaultValue={rules.rule2}/>
                </div>
                <div>
                    <TextField placeholder="add rule" variant="outlined" onChange={updateRule3} defaultValue={rules.rule3}/>
                </div>
            </div>
        </div>
    )
}

export function Consequence({margin}) {

    return(
        <div className={"Consequence " + margin}>
            <div className="Container">
                <h3 className="Small-Margin">reflect</h3>
                    <p>Reflection on the consequences (positive and negative) of using algorithmically informed decision-making in this policy setting</p>
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
