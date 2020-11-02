import React from 'react';
import Movie from './Movie';

const MovieList = (props) => {
    // console.log(props.movies);
    return (
    <div className="container">
        <div className="row">
                {
                    props.movies.map((movie, i) => {
                        return (
                            <Movie key={i} image={movie.medium_cover_image} data={movie} viewMovieInfo={props.viewMovieInfo} movieId={movie.id} title={movie.title} overview={movie.description_full} date={movie.year}/>
                        )
                    })
                }
        </div>
    </div>
    )
}

export default MovieList;