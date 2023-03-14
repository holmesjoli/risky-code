import { Button } from '@material-ui/core';

export function BackButton({routeBack}) {
    return(
        <div className="Button-Container-Left">
            <Button variant="outlined" color="secondary" className="Back" onClick={routeBack}>back</Button>
        </div>
    )
}

export function NextButton({routeNext, disabled=false, label="next"}) {

    return(
        <div className="Button-Container-Right">
            <Button variant="contained" className="Next" onClick={routeNext} disabled={disabled}>{label}</Button>
        </div>
    )
}

export function NextButtonOverlay({toggleOverlay, disabled=false, label="next"}) {

  return(
      <div className="Button-Container-Right-Overlay Margin-Top">
          <Button variant="outlined" color="secondary" className="Next" onClick={toggleOverlay} disabled={disabled}>{label}</Button>
      </div>
  )
}
