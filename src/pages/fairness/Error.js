import { useNavigate } from "react-router-dom";
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Terminology from '../../components/Terminology';
import Navigation from "../../components/Navigation";
import Progress from "../../components/Progress";
import { Button } from "@material-ui/core";

export function Content() {
    return(
        <div className="Content">
        </div>
    )
}

export default function Error({config, modules}) {

    let navigate = useNavigate();

    const routeNext = () => {
        let path = `/StreetBump`; 
        navigate(path);
      }
  
    const routeBack = () => {
        let path = `/Calibration`; 
        navigate(path);
    }

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <div className="Sidebar-Left">
                    <Description config={config}/>
                    <Progress id={config.id} modules={modules} />
                    <Terminology>
                        <div className="Container-Rule">
                            <h5>false positive rate</h5>
                            <p>The false positive rate is the probability of falsely rejecting the truth, simply triggering a false alarm</p>
                        </div>
                        <div className="Container-Rule">
                            <h5>false negative rate</h5>
                            <p>The false negative rate is the failure to raise a valid alarm</p>
                        </div>
                    </Terminology>
                    <div className="Button-Container-Left">
                        <Button variant="outlined" color="secondary" className="Back" onClick={routeBack}>back</Button>
                    </div>
                </div>
                <Content />
                <div className="Sidebar-Right">
                    <div className="Button-Container-Right">
                        <Button variant="contained" className="Next" onClick={routeNext}>next</Button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}