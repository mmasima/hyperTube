import React, { Component } from 'react';

const MovieInfo = (props) => {
    console.log(props);
    return (
        <div>
            <div className="container">
                <div className="row" onClick={props.closeMovieInfo} style={{ cursor: "pointer", paddingTop: 50 }}>
                    <i class="fas fa-arrow-left"></i>
                    <span style={{ marginLeft: 10 }}>Go back</span>
                </div>
                <div className="card  text-white bg-secondary mb-3">
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            {props.currentMovie.medium_cover_image === null ? <img className="card-img" src={`https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`} alt="Card image cap" style={{
                                width: "100px",
                                height: 360
                            }} /> : <img className="" src={props.currentMovie.medium_cover_image} alt="Card image" style={{
                                width: "100%",
                                height: 360
                            }} />}
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{props.currentMovie.title}</h5>
                                <video controls width="90%">
                                        <source src="http://localhost:9000/testAPI" type="video/mp4" ></source>

                                        Sorry, your browser doesn't support embedded videos.
                                    </video>
                                <label >year released</label>
                                <p className="card-text">{props.currentMovie.year}</p>
                                <label htmlFor="">rating</label>
                                <p className="card-text">{props.currentMovie.rating}</p>
                                <p className="card-text">{props.currentMovie.description_full}</p>
                                <div className="row">
                                    <div className="col">
                                        <button className="btn btn-primary" onClick={() => props.download(props)}>download Movie</button>
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
    )
}

export default MovieInfo;