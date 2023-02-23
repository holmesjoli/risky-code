import { useNavigate } from "react-router-dom";
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Navigation from "../../components/Navigation";
import Progress from "../../components/Progress";

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
                <div className="Sidebar-Left">
                    <Progress id={config.id} modules={modules} pageName={config.title}/>
                    <Description config={config}/>
                </div>
                <Content />
                <div className="Sidebar-Right">
                    <Navigation includeNext={false} routeBack={routeBack} config={config} modules={modules}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
