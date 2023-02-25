import { useNavigate, NavLink } from "react-router-dom";
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Terminology from '../../components/Terminology';
import Navigation from "../../components/Navigation";
import Stakeholders from "../../components/Stakeholders";
import Progress from "../../components/Progress";
import { BackButton, NextButton } from '../../components/Button';
import { LeftSideBar, RightSideBar } from "../../components/Sidebar";

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
                <LeftSideBar>
                    <Description config={config}/>
                    <Terminology>
                        <div className="Container-Rule">
                                <h4>recidivism</h4>
                                <p>A criminal reoffense</p>
                        </div>
                        <div className="Container-Rule">
                            <h4>stakeholders</h4>
                            <p>People impacted directly or indirectly by a system <NavLink to="/Resources">(Bender and Friedman 2018)</NavLink></p>
                        </div>
                    </Terminology>
                    <BackButton routeBack={routeBack}/>
                </LeftSideBar>
                <Content />
                <RightSideBar>
                <Progress id={config.id} modules={modules}/>
                    <Stakeholders/>
                    <NextButton routeNext={routeNext}/>
                </RightSideBar>
            </div>
            <Footer/>
        </div>
    )
}
