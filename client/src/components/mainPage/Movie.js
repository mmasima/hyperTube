import React from 'react';
import './Movie.css';
import { toast } from 'react-toastify';

toast.info('To watch a movie press download movie button till you get a download Finished Notification, Then press it again till you get a notification saying your Movie is Ready !')

const Movie = (props) => {
    return (
        <div className="col col-md-3 col-lg-3">
            <div className="card mt-5">
                {
                    props.image === null ? <img src={`https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`} className="card-img-top" alt="" />
                        : <img src={props.image} height="300px" width="100px" className="card-img-top" alt="" />
                }
                <div className="container">
                    <div className="card-body">
                        <h5 className="card-title">{props.data.title}</h5>
                        <div className="row align-items-start">
                            <div className="col">
                                <h6>{props.data.year}</h6>
                            </div>
                        </div>
                        <p><button className="btn btn-primary" onClick={() => props.viewMovieInfo(props)}>View Details</button></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Movie;