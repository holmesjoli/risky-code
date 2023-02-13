import Description from '../components/Description';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';

export function Content() {
    return(
        <div className="Content">
        </div>
    )
}

export default function About({config, modules, setModules}) {
    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <div className="Sidebar-Left">
                    <Description config={config}/>
                </div>
                <Content />
                <div className="Sidebar-Right">
                    <Navigation id="about" modules={modules} setModules={setModules}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}