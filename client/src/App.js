import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Registration from './components/registration/registration';
import Main from './components/main-page';
import Login from './components/login.js/login';
import Navbar from './components/navbar';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route component={Login} exact path="/" />
          <Route component={Registration} exact path="/Register" />
        </Switch>
      </div>
    );
  }
}

export default App;
