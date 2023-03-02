import { Button } from '@material-ui/core';

export function BackButton({routeBack}) {
    return(
        <div className="Button-Container-Left">
            <Button variant="outlined" color="secondary" className="Back" onClick={routeBack}>back</Button>
        </div>
    )
}

export function NextButton({routeNext}) {

    return(
        <div className="Button-Container-Right">
            <Button variant="contained" className="Next" onClick={routeNext}>next</Button>
        </div>
    )
}

export function NextButtonOverlay({toggleOverlay, disabled}) {

  return(
      <div className="">
          <Button variant="outlined" color="secondary" className="Next" onClick={toggleOverlay} disabled={disabled}>next</Button>
      </div>
  )
}
