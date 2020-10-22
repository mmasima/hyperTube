import React, { Component } from 'react';

class Videoplayer extends Component {
  
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

callAPI() {
  fetch("http://localhost:5000/torrent")
  .then(res => res.text())
  .then(res => this.setState({ apiResponse: res }))
  .catch(err => err);
  }

componentWillMount() {
    this.callAPI();
}  
render(){  
return (
  <div class="app">
  <header>
      <nav class="navbar navbar-dark bg-dark">
          <h1 class="navbar-brand">Hype Video</h1>
      </nav>
  </header>
  <div class="container">
      <div class="row">
          <div class="col-md-8 m-auto pt-4">
              <h1 class="text-center mb-5">Watch Movie !</h1>
              
              <video controls width="100%">
                  <source src="http://localhost:5000/torrent" type="video/mp4" ></source>

                  Sorry, your browser doesn't support embedded videos.
              </video>
          </div>
      </div>
  </div>
</div>
  );
}}


export default Videoplayer;