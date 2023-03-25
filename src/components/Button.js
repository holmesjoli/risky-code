import { Button } from '@material-ui/core';

export function BackButton({routeBack}) {
    return(
        <div className="Button-Container-Left">
            <Button variant="outlined" color="secondary" className="Back" onClick={routeBack}>back</Button>
        </div>
    )
}

export function NextButton({routeNext, className, disabled=false, label="next"}) {

    return(
        <div className="Button-Container-Right">
            <Button variant="outlined" className={className} onClick={routeNext} disabled={disabled}>{label}</Button>
        </div>
    )
}

export function NextButtonOverlay({toggleOverlay, className, disabled=false, label="next"}) {

  return(
      <div className="Button-Container-Right-Overlay Margin-Top">
          <Button variant="outlined" className={className} onClick={toggleOverlay} disabled={disabled}>{label}</Button>
      </div>
  )
}
