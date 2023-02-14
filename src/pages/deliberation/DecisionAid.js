import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import Description from '../../components/Description';
import Navigation from '../../components/Navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

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
                    <div className="Button-Container-Left">
                            <Button variant="outlined" color="secondary" onClick={routeBack}>back</Button>
                    </div>
                </div>
                <Content />
                <div className="Sidebar-Right">
                    <Navigation id={config.id} modules={modules}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
