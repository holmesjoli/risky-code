import { useNavigate, NavLink } from "react-router-dom";
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Terminology from '../../components/Terminology';
import Navigation from "../../components/Navigation";
import Stakeholders from "../../components/Stakeholders";
import Progress from "../../components/Progress";

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
                    <Progress id={config.id} modules={modules}/>
                    <Terminology>
                        <div className="Container-Rule">
                                <h5>recidivism</h5>
                                <p>A criminal reoffense</p>
                        </div>
                        <div className="Container-Rule">
                            <h5>stakeholders</h5>
                            <p>People impacted directly or indirectly by a system <NavLink to="/Resources">(Bender and Friedman 2018)</NavLink></p>
                        </div>
                    </Terminology>
                </div>
                <Content />
                <div className="Sidebar-Right">
                    <Navigation routeNext={routeNext} routeBack={routeBack} config={config} modules={modules}/>
                    <Stakeholders/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
