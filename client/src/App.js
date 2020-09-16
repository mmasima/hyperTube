import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Registration from './components/registration/registration';
import Navbar from './components/navbar';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Registration />
        
      </div>
    );
  }
}

export default App;
