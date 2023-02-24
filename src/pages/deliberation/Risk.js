import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Progress from "../../components/Progress";
import PolicyScenario from "../../components/PolicyScenario";

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

export default function Risk({config, modules, direct, indirect, policy, setPolicy}) {

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
                    <div className="Button-Container-Left">
                        <Button variant="outlined" color="secondary" className="Back" onClick={routeBack}>back</Button>
                    </div>
                </div>
                <Content direct={direct} indirect={indirect}/>
                <div className="Sidebar-Right">
                    <Progress id={config.id} modules={modules}/>
                    <PolicyScenario policy={policy} setPolicy={setPolicy}/>
                    <div className="Button-Container-Right">
                        <Button variant="contained" className="Next" onClick={routeNext}>next</Button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
