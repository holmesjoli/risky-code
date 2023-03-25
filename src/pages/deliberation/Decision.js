import { useNavigate } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Progress from "../../components/Progress";
import { BackButton } from '../../components/Button';
import { LeftSideBar, RightSideBar, Description, Terminology, Term } from "../../components/Sidebar";
import { RoleShort } from "../../components/Role";

export function Content() {
    return(
        <div className="Content No-Padding-Top">
        </div>
    )
}

export default function Decision({config, modules}) {

    let navigate = useNavigate();
  
    const routeBack = () => {
        let path = `/Risk`; 
        navigate(path);
    }

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <LeftSideBar>
                    <Description title={config.title}>
                    </Description>
                    <RoleShort moduleName="deliberation"/>
                    <BackButton routeBack={routeBack}/>
                </LeftSideBar>
                <Content />
                <RightSideBar>
                    <Progress id={config.id} modules={modules} className="Yellow"/>
                </RightSideBar>
            </div>
            <Footer/>
        </div>
    )
}
