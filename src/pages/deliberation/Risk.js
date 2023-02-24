import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Navigation from "../../components/Navigation";
import Progress from "../../components/Progress";

export function Content({direct, indirect}) {
    return(
        <div className="Content">
            <div className="Container">
                <h3>{direct}</h3>
            </div>
            <div className="Container">
                <h3>{indirect}</h3>
            </div>
        </div>
    )
}

export default function Risk({config, modules, direct, indirect}) {

    let navigate = useNavigate();

    const routeNext = () => {
        let path = `/Decision`; 
        navigate(path);
    }

    const routeBack = () => {
        let path = `/Stakeholders`; 
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
                <Content direct={direct} indirect={indirect}/>
                <div className="Sidebar-Right">
                    <div className="Button-Container-Right">
                        <Button variant="contained" className="Next" onClick={routeNext}>next</Button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
