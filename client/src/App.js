import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Registration from './components/registration/registration';
import VideoPlayer from './components/videoPlayer/videoPlayer';
import Main from './components/main-page';
import Login from './components/login.js/login';
import Navbar from './components/navbar';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Router>
          <Route component={Login} exact path="/" />
          <Route component={Registration} exact path="/Register" />
          <Route component={VideoPlayer} exact path="/Video" />
        </Router>
      </div>
    );
  }
}

export default App;
