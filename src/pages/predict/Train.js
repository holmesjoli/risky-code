import React from 'react';
import Navigation from '../../components/Navigation';
import Header from '../../components/Header';
import Card from "../../components/Card";

export default function Train() {
    return (
        <div className="App">
            <Header/>
            <div className="Main">
                <Navigation/>
                <Card/>
            </div>
      </div>
    )    
}
