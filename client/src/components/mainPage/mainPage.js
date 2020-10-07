import React, { Component } from 'react';
import SearchArea from './SearchArea';
import MovieList from './MovieList';
import Pagination from './Pagination';
import MovieInfo from './MovieInfo';

class Main extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      searchTerm: '',
      totalResults: 0,
      currentPage: 1,
      currentMovie: null
    }
    this.apiKey = "0b590acb8e9de1d3c68c2edaf553692c"
  }

  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}`)
      .then(data => data.json())
      .then(data => {
        console.log(data);
        this.setState({ movies: [...data.results], totalResults: data.total_results })
      })
  }

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  nextPage = (pageNumber) => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}&page=${pageNumber}`)
      .then(data => data.json())
      .then(data => {
        console.log(data);
        this.setState({ movies: [...data.results], currentPage: pageNumber })
      })
  }
  viewMovieInfo = (id) => {
    let filteredMovie;
    this.state.movies.forEach((movie, i) => {
      if (movie.id === id) {
        filteredMovie = movie
      }
    })

    this.setState({ currentMovie: filteredMovie })
  }

  closeMovieInfo = () => {
    this.setState({ currentMovie: null });
  }
  render() {
    const numberPages = Math.floor(this.state.totalResults / 20);
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
        <h5 className="navbar-brand">HyperTube</h5>
        <div className="mr-sm-2">
          <button className="btn btn-secondary">
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
          <MovieInfo currentMovie={this.state.currentMovie} closeMovieInfo={this.closeMovieInfo} />
        }
        {this.state.totalResults > 20 && this.state.currentMovie == null ? <Pagination pages={numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage} /> : ''}
      </div>
    );
  }
}

export default Main;