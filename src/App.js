import Header from './components/Header';
import Main from './components/Main';

export default function App({config}) {
    return(
        <div className="App">
            <Header/>
            <Main config={config}/>
        </div>
    )
}