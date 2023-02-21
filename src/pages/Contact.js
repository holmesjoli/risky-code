import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import Description from '../components/Description';
import Progress from '../components/Progress';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
                    <Description config={config}/>
                </div>
                <Content />
                <div className="Sidebar-Right">
                    <div className="Button-Container-Right">
                        <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>back</Button>
                    </div>
                    <Progress id="about" modules={modules}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}