import { useNavigate, NavLink } from "react-router-dom";
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Terminology from '../../components/Terminology';
import Navigation from "../../components/Navigation";
import Stakeholders from "../../components/Stakeholders";
import Progress from "../../components/Progress";
import { Button } from "@material-ui/core";

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
                        <div className="Container-Rule">
                                <h5>recidivism</h5>
                                <p>A criminal reoffense</p>
                        </div>
                        <div className="Container-Rule">
                            <h5>stakeholders</h5>
                            <p>People impacted directly or indirectly by a system <NavLink to="/Resources">(Bender and Friedman 2018)</NavLink></p>
                        </div>
                    </Terminology>
                    <div className="Button-Container-Left">
                        <Button variant="outlined" color="secondary" className="Back" onClick={routeBack}>back</Button>
                    </div>
                </div>
                <Content />
                <div className="Sidebar-Right">
                    <Progress id={config.id} modules={modules}/>
                    <Stakeholders/>
                    <div className="Button-Container-Right">
                        <Button variant="contained" className="Next" onClick={routeNext}>next</Button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
