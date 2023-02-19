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
            {/* <Button variant="outlined" color="secondary" onClick={routeNext}>start</Button> */}
            <Button variant="contained" onClick={routeNext}>start</Button>
        </div>
    )
}