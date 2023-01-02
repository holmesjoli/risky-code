import React from 'react';
import Navigation from './components/Navigation';
import Visualization from './components/Visualization';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="Main">
        <Navigation/>
        <Visualization/>
      </div>
    </div>
  );
}

export default App;
