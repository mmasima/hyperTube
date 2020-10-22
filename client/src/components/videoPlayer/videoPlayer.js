import React, { Component } from 'react';
import API from './ytsApi';



class VideoPlayer extends Component {
    constructor() {
        super()
        this.state = {
            movies: [],
            searchTerm: '',
            totalResults: 0,
            currentPage: 1,
            currentMovie: null
        }
    }
    Movies = () => {
        API.BestMovies()
            .then((res) => {
                console.log(res.data);
            })
    }

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(this.searchTerm);
    //     API.MovieSearch(this.searchTerm)
    //         .then(data => data.json())
    //         .then(data => {
    //             console.log(data);
    //             this.setState({ movies: [...data.results], totalResults: data.total_results })
    //         })
    // }

    handleChange = (e) => {
        this.setState({ searchTerm: e.target.value });
        console.log(this.searchTerm)
    }
    render() {
        const numberPages = Math.floor(this.state.totalResults / 20);
        return (
            <div className="container">
                <div className="row">
                    <div className="col m-auto pt-4">
                        <h1 className="text-center mb-5">
                            watch movie
                        </h1>
                        <div className="container mt-5">
                            <div className="row">
                                <section className="col-4 offset-2">
                                    <form action="" onSubmit={this.handleSubmit} >
                                        <div className="input-field">
                                            <input class="form-control mr-sm-2 bg-light" type="search" placeholder="Search movie" onChange={this.handleChange} aria-label="Search" />
                                        </div>
                                    </form>
                                </section>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default VideoPlayer;