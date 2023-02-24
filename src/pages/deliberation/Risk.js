import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import Description from '../../components/Description';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Progress from "../../components/Progress";
import PolicyScenario from "../../components/PolicyScenario";
import { BackButton, NextButton } from '../../components/Button';

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
                    <BackButton routeBack={routeBack}/>
                </div>
                <Content direct={direct} indirect={indirect}/>
                <div className="Sidebar-Right">
                    <Progress id={config.id} modules={modules}/>
                    <PolicyScenario policy={policy} setPolicy={setPolicy}/>
                    <NextButton routeNext={routeNext}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
