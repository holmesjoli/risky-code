import { useNavigate } from "react-router-dom";
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Terminology from '../../components/Terminology';
import Navigation from "../../components/Navigation";

export function Content() {
    return(
        <div className="Content">
        </div>
    )
}

export default function COMPAS({config, modules}) {

    let navigate = useNavigate();

    const routeNext = () => {
        let path = `/Stakeholders`; 
        navigate(path);
      }
  
    const routeBack = () => {
        let path = `/StreetBump`; 
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
                            <h5>recidivism</h5>
                            <p>A criminal reoffense</p>
                        </div>
                    </Terminology>
                </div>
                <Content />
                <div className="Sidebar-Right">
                    <Navigation routeNext={routeNext} routeBack={routeBack} config={config} modules={modules}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
