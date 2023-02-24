import { useNavigate } from "react-router-dom";
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Progress from "../../components/Progress";
import { BackButton } from '../../components/Button';
import { LeftSideBar, RightSideBar } from "../../components/Sidebar";

export function Content() {
    return(
        <div className="Content">
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
                    <Description config={config}/>
                    <BackButton routeBack={routeBack}/>
                </LeftSideBar>
                <Content />
                <RightSideBar>
                    <Progress id={config.id} modules={modules}/>
                </RightSideBar>
            </div>
            <Footer/>
        </div>
    )
}
