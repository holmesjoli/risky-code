import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import Progress from '../components/Progress';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Description } from "../components/Sidebar";
import { useEffect } from 'react';

export function Content() {
    return(
        <div className="Content">
        </div>
    )
}

export default function Contact({modules, state, remaining}) {

    let navigate = useNavigate(); 

    useEffect(() => {
        if (remaining === 0) {
            let path = `/`;
            navigate(path);
        }
    }, [state, remaining])

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <div className="Sidebar-Left">
                    <Description title="Contact"></Description>
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