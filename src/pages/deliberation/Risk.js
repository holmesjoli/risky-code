import { useNavigate } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Progress from "../../components/Progress";
import { PolicyScenario } from "../../components/TrackUserInputs";
import { BackButton, NextButton } from '../../components/Button';
import { LeftSideBar, RightSideBar, Description, Terminology, Term } from "../../components/Sidebar";
import { terms } from '../../utils/global';
import { RoleShort } from "../../components/Role";

export function Content() {
    return(
        <div className="Content No-Padding-Top">
            <div className="Container">
                {/* <h3>{direct}</h3> */}
            </div>
            <div className="Container">
                {/* <h3>{indirect}</h3> */}
            </div>
        </div>
    )
}

export default function Risk({config, modules, policy, setPolicy}) {

    let navigate = useNavigate();

    const routeNext = () => {
        let path = `/Decision`; 
        navigate(path);
    }

    const routeBack = () => {
        let path = `/Policy`;
        navigate(path);
    }

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <LeftSideBar>
                    <Description config={config}>
                    </Description>
                    <RoleShort moduleName="deliberation"/>
                    <BackButton routeBack={routeBack}/>
                </LeftSideBar>
                <Content />
                <RightSideBar>
                    <Progress id={config.id} modules={modules}/>
                    <PolicyScenario policy={policy} setPolicy={setPolicy}/>
                    <NextButton routeNext={routeNext}/>
                </RightSideBar>
            </div>
            <Footer/>
        </div>
    )
}
