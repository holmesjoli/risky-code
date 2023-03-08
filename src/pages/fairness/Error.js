import { useNavigate } from "react-router-dom";
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Terminology, Term } from '../../components/Terminology';
import { terms } from '../../utils/global';
import Progress from "../../components/Progress";
import { BackButton, NextButton } from '../../components/Button';
import { LeftSideBar, RightSideBar } from "../../components/Sidebar";

export function Content() {
    return(
        <div className="Content No-Padding-Top">
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
                <LeftSideBar>
                    <Description config={config}/>
                    <Terminology margin="Margin-Large-Bottom">
                        <Term term={terms['mathematical-fairness']}/>
                        <Term term={terms['fpr']}/>
                        <Term term={terms['fnr']}/>
                    </Terminology>
                    <BackButton routeBack={routeBack}/>
                </LeftSideBar>
                <Content />
                <RightSideBar>
                <Progress id={config.id} modules={modules} />
                    <NextButton routeNext={routeNext}/>
                </RightSideBar>
            </div>
            <Footer/>
        </div>
    )
}