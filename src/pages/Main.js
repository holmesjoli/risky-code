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
            <h2>a digital workshop to educate participants and facilitate deliberation about algorithmically informed decision-making</h2>
            <Button variant="contained" onClick={routeNext}>start workshop</Button>
        </div>
    )
}
