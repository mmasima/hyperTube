import React, { Component, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import auth from '../../config/auth';
import SearchArea from './SearchArea';
import MovieList from './MovieList';
import axios from 'axios';
import Pagination from './Pagination';
import MovieInfo from './MovieInfo';
import Cookies from 'js-cookie';
import profileApis from './editProfile/ProfileApis'

function Main2({ pap }) {
  var [moviename2, setMoviename] = useState("")

  return <div onClick={() => setMoviename}>{moviename2}</div>;

}

class Main extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      searchTerm: '',
      totalResults: 0,
      currentPage: 1,
      currentMovie: null,
      moviepath: null,
      res: null,
      pap: null
    }
  }

  catchy = () => () => {
    //
    // YOU CAN'T DO THIS
    // REACT WONT ALLOW YOU
    //
    const [moviename3, setMovienname3] = useState("");
    return <div>{ moviename3 }</div>
  }

 MyDiv = () => {
    const [moviename, setMoviename] = this.state.message;
 
    return <div onClick={() => setMoviename(1)}>{moviename}</div>;
 }
MyDiv2 = () => {
  const [video, setVideo] = useState();

  return <div onClick={() => setVideo(1)}>{video}</div>;
}

  download =(pap) => {

    console.log("1 : this is all the movie data you get");
    console.log(this.state.currentMovie);
    console.log("2: this is what you were looking for yesterday")
    //torrent to download
    console.log(this.state);
    console.log(this.state.currentMovie.torrents);
    //torrent ID
    console.log(this.state.currentMovie.id)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://yts.mx/api/v2/list_movies.json=?query_term=${this.state.searchTerm}`)
      .then(data => data.json())
      .then(data => {
        
        this.setState({ movies: [...data.data.movies], totalResults: data.data.movie_count })
      })
  }

  handleSubmit2 = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/torrent/video`)
      .then(data => {
        
        this.setState({ message: [data.message]});
      })
  }

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  nextPage = (pageNumber) => {
    fetch(`https://yts.mx/api/v2/list_movies.json=?query_term=${this.state.searchTerm}&page=${pageNumber}`)
      .then(data => data.json())
      .then(data => {
        
        this.setState({ movies: [...data.data.movies], currentPage: pageNumber })
      })
  }
   viewMovieInfo = (id) => {
    let filteredMovie;
    this.state.movies.forEach((movie, i) => {
      if (movie.id === id.movieId) {
        filteredMovie = movie
      }
    })

    this.setState({ currentMovie: filteredMovie })
  }
  logout = (props) => {
    Cookies.remove("user");
    localStorage.removeItem('login');
    auth.logout(() => {
        this.props.history.push("/");
    });
}
loggedIn = (props) => {
  profileApis.getUser().then((res) => {
    localStorage.setItem('userDetails', JSON.stringify({
        user: res.data[0]
    }))
})
  auth.login(() => {
    this.props.history.push('editProfile');
  })
}

  closeMovieInfo = () => {
    this.setState({ currentMovie: null });
  }
  
  render() {
  const numberPages = Math.floor(this.state.totalResults / 20);
  const moviename = Main2.data
  const setVideo = this.MyDiv2.setVideo
  const setMoviename = this.MyDiv2.setMoviename
  const MyInlineHook = this.catchy();

  
    const submit = async e => {
      await axios.get(`http://localhost:5000/torrent?url=${this.state.currentMovie.torrents[0].url}&id=${this.state.currentMovie.id}&title=${this.state.currentMovie.title}`, {
        
      }).then(res => {
        console.log('res.data', res.data);
        if (res.data.message) {
          let videoplay = `http://localhost:5000/torrent/video?movie=${res.data.message}`
          setVideo(videoplay)
          let nameonly = res.data.message
          setMoviename(nameonly.substring(0, nameonly.length - 4) + '.mp4')
          console.log('moviename', videoplay);
          console.log('videonnn', nameonly.substring(0, nameonly.length - 4) + '.mp4');
        }
        // window.location.reload();
  
      })
        .catch(error => console.log(error))
    }


    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
        <h5 className="navbar-brand">HyperTube</h5>
        <div className="mr-sm-2">
          <button className="btn btn-secondary mr-2" onClick={this.loggedIn}>
              edit profile
          </button>
          <button className="btn btn-secondary" onClick={this.logout}>
            logout
          </button>
        </div>
      </nav>
        { this.state.currentMovie == null ?
          <div>
            <SearchArea handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
            <MovieList viewMovieInfo={this.viewMovieInfo} movies={this.state.movies} />
          </div>
          :
          <div>
          <div className="container">
              <div className="row" onClick={this.closeMovieInfo} style={{ cursor: "pointer", paddingTop: 50 }}>
                  <i class="fas fa-arrow-left"></i>
        <span style={{ marginLeft: 10 }}>Go back{this.catchy}</span>
              </div>
              <div className="card  text-white bg-secondary mb-3">
                  <div className="row no-gutters">
                      <div className="col-md-4">
                          {this.state.currentMovie.background_image_original == null ? <img className="card-img" src={`https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`} alt="Card image cap" style={{
                              width: "100%",
                              height: 360
                          }} /> : <img className="" src={this.state.currentMovie.background_image_original} alt="Card image" style={{
                              width: "100%",
                              height: 360
                          }} />}
                      </div>
                      <div className="col-md-8">
                          <div className="card-body">
                              <h5 className="card-title">{this.state.currentMovie.year}</h5>
                              <video controls width="90%">
                  <source src={`http://localhost:5000/torrent/video?movie=${MyInlineHook}`} type="video/mp4" ></source>

                  Sorry, your browser doesn't support embedded videos.
              </video>
                              <label >year released</label>
                              <p className="card-text">{this.state.currentMovie.year}</p>
                              <label htmlFor="">rating</label>
                              <p className="card-text">{this.state.currentMovie.rating}</p>
                              <p className="card-text">{this.state.currentMovie.description_full}</p>
                              <div className="row">
                                  <div className="col">
                                      <button className="btn btn-primary" onClick={this.download}>download Movie</button>
                                  </div>
                                  <div className="col">
                                      <button className="btn btn-primary">comment</button>
                                  </div>
                                  <div className="col">
                                      <button className="btn btn-primary"onClick={submit}>Play</button>
                                  </div>
                                  <div className="col">
                                      <button className="btn btn-primary"onClick={submit}>downloady</button>
                                  </div>
                                  <div><MyInlineHook /></div>
                              </div>
                          </div>
                      </div>
                  </div>

              </div>
          </div>
      </div>
        }
        {this.state.totalResults > 20 && this.state.currentMovie == null ? <Pagination pages={numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage} /> : ''}
      </div>
    );
  }
}

export default Main;