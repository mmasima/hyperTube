import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Registration from './components/registration/registration';
import Main from './components/main-page';



class App extends Component {
  

  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default App;
