import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import Description from '../../components/Description';
import Navigation from '../../components/Navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Terminology from '../../components/Terminology';

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
                    <Terminology>
                        <div className="Container-Outlined">
                            <h5>false positive rate</h5>
                            <p>The false positive rate is the probability of falsely rejecting the truth, simply triggering a false alarm</p>
                        </div>
                        <div className="Container-Outlined">
                            <h5>false negative rate</h5>
                            <p>The false negative rate is the failure to raise a valid alarm</p>
                        </div>
                    </Terminology>
                </div>
                <Content />
                <div className="Sidebar-Right">
                    <div className="Button-Container-Right">
                        <Button variant="outlined" color="secondary" onClick={routeBack}>back</Button>
                        <Button variant="contained" className="Next" onClick={routeNext}>next</Button>
                    </div>
                    <Navigation id={config.id} modules={modules}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}