import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export default function Main() {

    let navigate = useNavigate(); 
    const routeNext = () => {
      let path = `/Introduction`; 
      navigate(path);
    }

    return(
        <div className="Start">
            <h1>Risky Code</h1>
            {/* <div className="Inner"> */}
                <h3>facilitating deliberation about the impacts of algorithmically informed decision-making in public policy</h3>
            {/* </div> */}
            {/* <Button variant="outlined" color="secondary" onClick={routeNext}>start</Button> */}
            <Button variant="contained" onClick={routeNext}>start</Button>
        </div>
    )
}