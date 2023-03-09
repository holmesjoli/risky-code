import { Button } from '@material-ui/core';

export function BackButton({routeBack}) {
    return(
        <div className="Button-Container-Left">
            <Button variant="outlined" color="secondary" className="Back" onClick={routeBack}>back</Button>
        </div>
    )
}

export function NextButton({routeNext, disabled=false}) {

    return(
        <div className="Button-Container-Right">
            <Button variant="contained" className="Next" onClick={routeNext} disabled={disabled}>next</Button>
        </div>
    )
}

export function NextButtonOverlay({toggleOverlay, disabled=false}) {

  return(
      <div className="Button-Container-Right">
          <Button variant="outlined" color="secondary" className="Next" onClick={toggleOverlay} disabled={disabled}>next</Button>
      </div>
  )
}
