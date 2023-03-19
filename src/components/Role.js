export function Role({moduleName, addTitle = true}) {

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
