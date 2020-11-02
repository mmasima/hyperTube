import React, { Component } from 'react';
import auth from '../../config/auth';
import SearchArea from './SearchArea';
import MovieList from './MovieList';
import axios from 'axios';
import Pagination from './Pagination';
import Cookies from 'js-cookie';
import profileApis from './editProfile/ProfileApis'
import ModalVideo from 'react-modal-video';
import mainApi from './mainApi';


class Main extends Component {
  constructor() {
    super()
    this.state = {
      comment: "",
      movies: [],
      searchTerm: '',
      totalResults: 0,
      currentPage: 1,
      currentMovie: null,
      moviepath: null,
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

  changeComment = (e) => {
    this.setState({ comment: e.target.value })
  }

  submitComment = (e) => {
    e.preventDefault()
    mainApi.submitComment(this.state.currentMovie.id, this.state.comment)
      .then((res) => {
        if (res.status === 401) {
          console.log("failed to comment")
          window.location.reload(false);
        }
        else if (res.status === 200) {
          console.log("comment added successfully!")
          window.location.reload(false);
        }
      })
  }

  nextPage = (pageNumber) => {
    fetch(`https://yts.mx/api/v2/list_movies.json=?query_term=${this.state.searchTerm}&page=${pageNumber}`)
      .then(data => data.json())
      .then(data => {

        this.setState({ movies: [...data.data.movies], currentPage: pageNumber })
      })
  }
  viewMovieInfo = (id) => {
    mainApi.getComments(id.movieId);
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
    if (this.videoplay) {
      console.log(this.videoplay);
      this.setState({ isOpen: true });
    }
  }

  latestMovies = (e) => {
    e.preventDefault();
    fetch(`https://yts.mx/api/v2/list_movies.json=?minimum_rating=7`)
      .then(data => data.json())
      .then(data => {
        console.log(data);
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
        {this.state.currentMovie == null ?
          <div>
            <SearchArea handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
            <MovieList viewMovieInfo={this.viewMovieInfo} movies={this.state.movies} />
          </div>
          :
          <div>
            <div className="container">
              <div className="row" onClick={this.closeMovieInfo} style={{ cursor: "pointer", paddingTop: 50 }}>
                <i className="fas fa-arrow-left"></i>
                <span style={{ marginLeft: 10 }}>Go back{this.catchy}</span>
              </div>
              <div className="card  text-white bg-secondary mb-3">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    {this.state.currentMovie.medium_cover_image === null ? <img className="card-img" src={`https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`} alt="" style={{
                      width: "100%",
                      height: 350
                    }} /> : <img className="" src={this.state.currentMovie.medium_cover_image} alt="" style={{
                      width: "100%",
                      height: 450
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
                          <input type='text' name="comment" value={this.comment} onChange={this.changeComment} />
                          <button type='submit' className="btn btn-primary ml-3" onClick={this.submitComment}>comment</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <h4>
                      comments
                    </h4>
                  </div>
                </div>
                <div className="row">

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