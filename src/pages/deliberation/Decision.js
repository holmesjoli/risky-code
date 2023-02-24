import { useNavigate } from "react-router-dom";
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Navigation from "../../components/Navigation";
import Progress from "../../components/Progress";
import { Button } from "@material-ui/core";

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
                    <Description config={config}/>
                    <Progress id={config.id} modules={modules}/>
                    <div className="Button-Container-Left">
                        <Button variant="outlined" color="secondary" className="Back" onClick={routeBack}>back</Button>
                    </div>
                </div>
                <Content />
                <div className="Sidebar-Right">
                </div>
            </div>
            <Footer/>
        </div>
    )
}
