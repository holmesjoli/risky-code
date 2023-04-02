export function RolePrediction({user}) {

    return(
        <div className="Container2 Margin-Bottom">
            <h4 className="Small-Margin">you</h4>
            {user==="group"? <p>Your team's role in this module is <span className="Semi-Bold">you</span>, a group of busy individuals who want to learn more about algorithmic decision-making</p>: <p>Your role in this module is <span className="Semi-Bold">you</span>, a busy individual who wants to learn more about algorithmic decision-making</p>}

            <h4>Responsibilities</h4>
            <ul>
                <li className="No-Margin-Bottom">Get your laundry done</li>
            </ul>
        </div>
    )
}

export function RoleFairness({user}) {
    return(
        <div className="Container2 Margin-Bottom">
            <h4 className="Small-Margin">data scientist</h4>
            {user==="group"? <p>Your team's role in this module is a team of socially aware <span className="Semi-Bold">data scientists</span>, interested in algorithmic fairness</p>: <p>Your role in this module is a socially aware <span className="Semi-Bold">data scientist</span> interested in algorithmic fairness.</p>}

            <h4>Responsibilities</h4>
            <ul>
                <li>Clean and parse data</li>
                <li>Choose variables to add to a predictive model</li>
                <li className="No-Margin-Bottom">Optimize for different indicators of predictive model performance (e.g., accuracy)</li>
            </ul>
        </div>
    )
}

export function RoleStakeholder({user}) {
    return(
        <div className="Container2 Margin-Bottom">
            <h4 className="Small-Margin">designer</h4>
            {user==="group"? <p>Your team's role in this module is a team of socially aware <span className="Semi-Bold">designers</span>, interested in bring value-sensitive design methods to algorithmically informed decision-making</p>: <p>Your role in this module is a socially aware <span className="Semi-Bold">designer</span>, interested in bring value-sensitive design methods to algorithmically informed decision-making.</p>}

            <h4>Responsibilities</h4>
            <ul>
                <li>Generate ideas and plans</li>
                <li>Brainstorm and suggest interventions to challenging problems</li>
                <li>Use visual strategies to show solutions/interventions</li>
                <li className="No-Margin-Bottom">Facilitate conversation</li>
            </ul>
        </div>
    )
}

export function RoleDeliberation({user}) {
    return(
        <div className="Container2 Margin-Bottom">
            <h4 className="Small-Margin">public policymaker</h4>
            {user==="group"? <p>Your team's role in this module is a team of socially aware <span className="Semi-Bold">public policymakers</span>, interested in using algorithmic decision-making in equitable and fair ways</p>: <p>Your role in this module is a <span className="Semi-Bold">public policymaker</span>, interested in using algorithmic decision-making in equitable and fair ways</p>}
            <h4>Responsibilities</h4>
            <ul>
                <li className="No-Margin-Bottom">Create plans and recommendations for public issues</li>
                <li className="No-Margin-Bottom">Gather and summarize evidence-based research</li>
                <li className="No-Margin-Bottom">Make decisions and implement plans</li>
            </ul>
        </div>
    )
}

export function Role({moduleName, user}) {

    if (moduleName === "prediction") {
        return(
            <div className="Container2 Margin-Bottom">
                <h3 className="Small-Margin">role: <span className="Emphasis">you</span></h3>
                {user==="group"? <p className="No-Margin-Bottom">Your team's role in this module is <span className="Semi-Bold">you</span>, a group of individuals who are interested in learning more about algorithmic decision-making</p>: <p className="No-Margin-Bottom">Your role in this module is <span className="Semi-Bold">you</span>, an individual who is interested in learning more about algorithmic decision-making</p>}
            </div>
        )
    } else if (moduleName === "fairness") {
        return(
            <div className="Container2 Margin-Bottom">
                <h3 className="Small-Margin">role: <span className="Emphasis">data scientist</span></h3><h3 className="Small-Margin">role: <span className="Emphasis">data scientist</span></h3>
                {user==="group"? <p className="No-Margin-Bottom">Your team's role in this module is a team of socially aware <span className="Semi-Bold">data scientists</span>, interested in algorithmic fairness and equity</p>: <p className="No-Margin-Bottom">Your role in this module is a socially aware <span className="Semi-Bold">data scientist</span> interested in algorithmic fairness and equity.</p>}
            </div>
        )
    } else if (moduleName === "caseStudies") {
        return(
            <div className="Container2 Margin-Bottom">
                <h3 className="Small-Margin">role: <span className="Emphasis">designer</span></h3>
                {user==="group"? <p className="No-Margin-Bottom">Your team's role in this module is a team of socially aware <span className="Semi-Bold">designers</span>, interested in applying design methods to algorithmic decision-making</p>: <p className="No-Margin-Bottom">Your role in this module is a socially aware <span className="Semi-Bold">designer</span>, interested in applying design methods to algorithmic decision-making.</p>}
            </div>
        )
    } else if (moduleName === "deliberation") {
        return(
            <div className="Container2 Margin-Bottom">
                <h3 className="Small-Margin">role: <span className="Emphasis">public policymaker</span></h3>
                {user==="group"? <p className="No-Margin-Bottom">Your team's role in this module is a team of socially aware <span className="Semi-Bold">public policymakers</span>, interested in using algorithmic decision-making in equitable and fair ways</p>: <p className="No-Margin-Bottom">Your role in this module is a <span className="Semi-Bold">public policymaker</span>, interested in using algorithmic decision-making in equitable and fair ways</p>}
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
