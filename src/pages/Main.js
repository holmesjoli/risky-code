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
            <h3>a digital workshop to improve algorithmic literacy</h3>
            <Button variant="contained" onClick={routeNext}>start workshop</Button>
        </div>
    )
}
