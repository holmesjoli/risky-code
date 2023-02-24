import { useNavigate } from "react-router-dom";
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Terminology from '../../components/Terminology';
import Progress from "../../components/Progress";
import { BackButton, NextButton } from '../../components/Button';

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
                        <div className="Container-Rule">
                            <h4>false positive rate</h4>
                            <p>The false positive rate is the probability of falsely rejecting the truth, simply triggering a false alarm</p>
                        </div>
                        <div className="Container-Rule">
                            <h4>false negative rate</h4>
                            <p>The false negative rate is the failure to raise a valid alarm</p>
                        </div>
                    </Terminology>
                    <BackButton routeBack={routeBack}/>
                </div>
                <Content />
                <div className="Sidebar-Right">
                    <Progress id={config.id} modules={modules} />
                    <NextButton routeNext={routeNext}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}