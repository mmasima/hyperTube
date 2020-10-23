import React from 'react';
import './Movie.css';

const Movie = (props) => {
    return (
        <div className="col col-md-3 col-lg-3">
            <div className="card mt-5">
                {
                    props.image == null ? <img src={`https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`} className="card-img-top" alt="card image"/> 
                    : <img src={props.image} height="200px" width="150px" className="card-img-top" alt="card image"/>
                }
                <div class="card-body">
                    <h5 class="card-title">{props.data.title}</h5>
                    <p><button class="btn btn-primary" onClick={() => props.viewMovieInfo(props)}>View Details</button></p>                     
                </div>
            </div>
        </div>
    )
}

export default Movie;