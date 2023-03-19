export function RolePrediction({user}) {

    console.log(user)
    return(
        <div className="Container Margin-Bottom">
            <h4 className="Small-Margin">you</h4>
            {user==="group"? <p className="No-Margin-Bottom">Your team's role in this module is <span className="Semi-Bold">you</span>, a group of busy individuals who want to learn more about algorithmic decision-making</p>: <p className="No-Margin-Bottom">Your role in this module is <span className="Semi-Bold">you</span>, a busy individual who wants to learn more about algorithmic decision-making</p>}
        </div>
    )
}

export function RoleFairnessPrediction({user}) {
    return(
        <div className="Container Margin-Bottom">
            <h4 className="Small-Margin">data scientist</h4>
            {user==="group"? <p className="No-Margin-Bottom">Your team's role in this module is a team of socially aware <span className="Semi-Bold">data scientists</span>, interested in algorithmic fairness</p>: <p className="No-Margin-Bottom">Your role in this module is a socially aware <span className="Semi-Bold">data scientist</span> interested in algorithmic fairness.</p>}
        </div>
    )
}

export function RoleFairnessStakeholder({user}) {
    return(
        <div className="Container Margin-Bottom">
            <h4 className="Small-Margin">designer</h4>
            {user==="group"? <p className="No-Margin-Bottom">Your team's role in this module is a team of socially aware <span className="Semi-Bold">designers</span>, interested in bring value-sensitive design methods to algorithmically informed decision-making</p>: <p className="No-Margin-Bottom">Your role in this module is a socially aware <span className="Semi-Bold">designer</span>, interested in bring value-sensitive design methods to algorithmically informed decision-making.</p>}
        </div>
    )
}

export function RoleFairnessDeliberation({user}) {
    return(
        <div className="Card-Group">
            <h4 className="Small-Margin">public policymaker</h4>
            {user==="group"? <p className="No-Margin-Bottom">Your team's role in this module is a team of socially aware <span className="Semi-Bold">public policymakers</span>, interested in using algorithmic decision-making in equitable and fair ways</p>: <p className="No-Margin-Bottom">Your role in this module is a <span className="Semi-Bold">public policymaker</span>, interested in using algorithmic decision-making in equitable and fair ways</p>}
        </div>
    )
}


export function Role({moduleName}) {

    if (moduleName === "prediction") {
        return(
            <div className="Card-Group">
                <h3 className="Small-Margin">role: <span className="Emphasis">you</span></h3>
                <p className="No-Margin-Bottom">Your role in this module is <span className="Emphasis">you</span>, a busy individual who wants to learn more about algorithmic decision-making.</p>
            </div>
        )
    } else if (moduleName === "fairness") {
        return(
            <div className="Card-Group">
                <h3 className="Small-Margin">role: <span className="Emphasis">data scientist</span></h3>
                <p className="No-Margin-Bottom">Your role in this module is a socially aware <span className="Emphasis">data scientist</span> interested in algorithmic fairness.</p>
            </div>
        )
    } else if (moduleName === "caseStudies") {
        return(
            <div className="Card-Group">
                <h3 className="Small-Margin">role: <span className="Emphasis">designer</span></h3>
                <p className="No-Margin-Bottom">Your role in this module is a socially aware <span className="Emphasis">designer</span> interested in bring value-sensitive design methods to algorithmically informed decision-making.</p>
            </div>
        )
    } else if (moduleName === "deliberation") {
        return(
            <div className="Card-Group">
                <h3 className="Small-Margin">role: <span className="Emphasis">public policymaker</span></h3>
                <p className="No-Margin-Bottom">Your role in this module is a <span className="Emphasis">public policymaker</span> interested in using algorithmic decision-making.</p>
            </div>
        )
    }
}

export function RoleShort({moduleName}) {

    function definition(moduleName) {
        if (moduleName === "prediction") {
            return(
                <span className="Emphasis">you</span>
            )
        } else if (moduleName === "fairness") {
            return(
                <span className="Emphasis">data scientist</span>
            )
        } else if (moduleName === "caseStudies") {
            return(
                <span className="Emphasis">designer</span>
            )
        } else if (moduleName === "deliberation") {
            return(
                <span className="Emphasis">public policymaker</span>
            )
        }
    }

    let children = definition(moduleName);

    return(
        <div className="Margin-Top Container">
            <h3 className="No-Margin-Bottom">role: {children}</h3>
        </div>
    )
}
