import Progress from '../components/Progress';
import { Button } from "@material-ui/core";

export default function Navigation({includeNext = true, includeBack = true, routeNext, routeBack, config, modules}) {
    return(
        <div className="Navigation Container-Outlined">
            <h5>navigation</h5>
            <div className="Button-Container-Right">
                {
                    includeBack ? <Button variant="outlined" color="secondary" onClick={routeBack}>back</Button>: <></>
                }
                {
                    includeNext ? <Button variant="contained" className="Next" onClick={routeNext}>next</Button> : <></>
                }
            </div>
            <Progress id={config.id} modules={modules}/>
        </div>
    )
}