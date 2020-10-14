import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Registration from './components/registration/registration';
import VideoPlayer from './components/videoPlayer/videoPlayer';
import Main from './components/mainPage/mainPage';
import Login from './components/login.js/login';
import ForgotPass from './components/forgotPass/forgotPass';
import ResetPass from './components/forgotPass/resetPass';
import EditProfile from'./components/mainPage/editProfile/editProfile';
import { ProtectedRoute } from './config/protectedRoute';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route component={Login} exact path="/" />
          <Route component={Registration} exact path="/Register" />
          <Route component={VideoPlayer} exact path="/Video" />
          <Route component={ForgotPass} exact path="/forgotPass" />
          <Route component={ResetPass} exact path="/resetPass" />
          <ProtectedRoute component={Main} exact path="/mainPage" />
          <ProtectedRoute component={EditProfile} exact path="/EditProfile" />

        </Switch>
      </div>
    );
  }
}

export default App;
