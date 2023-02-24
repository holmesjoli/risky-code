import { Button } from "@material-ui/core";

export default function Navigation({includeNext = true, includeBack = true, routeNext, routeBack, config, modules}) {
    return(
        <div className="Button-Container-Right">
            {
                includeBack ? <Button variant="outlined" color="secondary" onClick={routeBack}>back</Button>: <></>
            }
            {
                includeNext ? <Button variant="contained" className="Next" onClick={routeNext}>next</Button> : <></>
            }
        </div>
    )
}