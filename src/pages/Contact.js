import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import Progress from '../components/Progress';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Description } from "../components/Sidebar";

export function Content() {
    return(
        <div className="Content">
        </div>
    )
}

export default function Contact({config, modules}) {

    let navigate = useNavigate(); 

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <div className="Sidebar-Left">
                    <Description config={config}>
                    </Description>
                    <div className="Button-Container-Left">
                        <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>back</Button>
                    </div>
                </div>
                <Content />
                <div className="Sidebar-Right">
                    <Progress id="about" modules={modules}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}