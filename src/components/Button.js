import { Button } from '@material-ui/core';

export function BackButton({routeBack}) {
    return(
        <Button variant="outlined" color="secondary" className="Back" onClick={routeBack}>back</Button>
    )
}

export function NextButton({routeNext, className, disabled=false, label="next"}) {

    if (disabled) {
        className = ""
    }

    if (!disabled && className=== undefined) {
        className="Purple"
    }

    return(
        <div className="Margin-Bottom">
            <Button variant="outlined" className={className + " Next"} onClick={routeNext} disabled={disabled}>{label}</Button>
        </div>
    )
}

export function NextButtonOverlay({toggleOverlay, className, disabled=false, label="next"}) {

    if (disabled) {
        className = ""
    }

    if (!disabled && className=== undefined) {
        className="Purple"
    }

    return(
        <div className="Button-Container-Right-Overlay Margin-Top">
            <Button variant="outlined" className={className} onClick={toggleOverlay} disabled={disabled}>{label}</Button>
        </div>
    )
}

export function NextButtonOrientation({routeNext, className, disabled=false, label="next"}) {

    if (disabled) {
        className = ""
    }

    if (!disabled && className=== undefined) {
        className="Purple"
    }

    return(
        <Button variant="outlined" className={className} onClick={routeNext} disabled={disabled}>{label}</Button>
    )
}
