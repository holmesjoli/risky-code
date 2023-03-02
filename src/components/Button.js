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

export function NextButtonOverlay({toggleOverlay}) {

    {/* <Button variant="contained" className="Next" disabled={nClassified !== items.length} onClick={routeNext}>next</Button> */}
  return(
      <div className="">
          <Button variant="contained" className="Next" onClick={toggleOverlay}>next</Button>
      </div>
  )
}
