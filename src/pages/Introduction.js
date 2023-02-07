import React from 'react';
import { useNavigate } from "react-router-dom";
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from "@material-ui/core";

export function Content() {

    let navigate = useNavigate(); 
    const routeNext = () => {
      let path = `/Classify`; 
      navigate(path);
    }  

    return(
        <div className="Content">
            <Button variant="contained" onClick={routeNext}>Next</Button>
        </div>
    )
}

export default function Introduction() {
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