import React, { Component } from 'react';
import auth from '../../config/auth';
import SearchArea from './SearchArea';
import MovieList from './MovieList';
import axios from 'axios';
import Pagination from './Pagination';
import Cookies from 'js-cookie';
import profileApis from './editProfile/ProfileApis'
import ModalVideo from 'react-modal-video';


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
      pap: null,
      videoname: "",
      videoplay: "",
      setVideo: "",
      isOpen: false

    }
  }

  download = async () => {

    await axios.get(`http://localhost:5000/torrent?url=${this.state.currentMovie.torrents[0].url}&id=${this.state.currentMovie.id}&title=${this.state.currentMovie.title}`, {

    }).then(res => {
      console.log('res.data', res.data);
      if (res.data.message) {
        this.videoplay = `http://localhost:5000/torrent/video?movie=${res.data.message}`
        let nameonly = res.data.message
        this.videoname = (nameonly.substring(0, nameonly.length - 4) + '.mp4')
        console.log('moviename', this.videoname);
        // console.log('videonnn', nameonly.substring(0, nameonly.length - 4) + '.mp4');
      }


    })
      .catch(error => console.log(error))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://yts.mx/api/v2/list_movies.json=?query_term=${this.state.searchTerm}`)
      .then(data => data.json())
      .then(data => {

        this.setState({ movies: [...data.data.movies], totalResults: data.data.movie_count })
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

  MoviePlayable = () => {
    if(this.videoplay){
      console.log("hello world")
      console.log(this.videoplay);
      this.setState({ isOpen: true});
    }
  }

  latestMovies = (e) => {
    e.preventDefault();
    fetch(`https://yts.mx/api/v2/list_movies.json=?minimum_rating=7`)
      .then(data => data.json())
      .then(data => {

        this.setState({ movies: [...data.data.movies], totalResults: data.data.movie_count })
      })
  }
  

  render() {
    const numberPages = Math.floor(this.state.totalResults / 20);
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <h5 className="navbar-brand">HyperTube</h5>
          <div className="mr-sm-2">
          <button className="btn btn-secondary mr-2" onClick={this.latestMovies}>
              latest Movies
          </button>
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
                    {this.state.currentMovie.background_image_original == null ? <img className="card-img" src={`https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`} alt="" style={{
                      width: "100%",
                      height: 360
                    }} /> : <img className="" src={this.state.currentMovie.background_image_original} alt="" style={{
                      width: "100%",
                      height: 360
                    }} />}
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{this.state.currentMovie.year}</h5>
                      <React.Fragment>
                        <ModalVideo channel='custom' height="200px" width="150px" url={this.videoplay} autoplay isOpen={this.state.isOpen} onClose={() => this.isOpen = false} />
                        <button className="btn-primary" onClick={this.MoviePlayable}>Play</button>
                      </React.Fragment>
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