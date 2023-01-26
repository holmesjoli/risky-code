import Navigation from '../components/Navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';

export function Content() {
    return(
        <div className="Content">
        </div>
    )
}

export default function About() {
    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <div className="Sidebar">
                    <Navigation/>
                </div>
                <Content />
            </div>
            <Footer/>
        </div>
    )
}