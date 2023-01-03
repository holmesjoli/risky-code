import React from 'react';
import Navigation from './Navigation';
import Header from './Header';
import Description from "./Description";

export default function Main(config) {

    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <Navigation/>
                <Description title={config.config.title} subtitle={config.config.subtitle} text={config.config.descr}/>
                <div className="Content">

                </div>
            </div>
      </div>
    )
};