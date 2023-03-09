import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export default function Main() {

    let navigate = useNavigate(); 
    const routeNext = () => {
      let path = `/Orientation`; 
      navigate(path);
    }

    return(
        <div className="Start">
            <h1>Risky Code</h1>
            <h3>facilitating deliberation about the impacts of algorithmically informed decision-making in public policy</h3>
            <Button variant="contained" onClick={routeNext}>start</Button>
        </div>
    )
}
