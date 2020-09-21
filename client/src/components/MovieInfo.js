import React from 'react';

const MovieInfo = (props) => {      
    return (
        <div>
            <div className="container">
                <div className="row" onClick={props.closeMovieInfo} style={{cursor: "pointer", paddingTop: 50}}>
                    <i class="fas fa-arrow-left"></i>
                    <span style={{marginLeft: 10}}>Go back</span>
                </div>
                <div className="card  text-white bg-secondary mb-3">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        { props.currentMovie.poster_path == null ? <img className="card-img" src={`https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`} alt="Card image cap" style={{ width: "100%",
                            height: 360}} /> : <img className="" src={`http://image.tmdb.org/t/p/w185${props.currentMovie.poster_path}`} alt="Card image" style={{ width: "100%",
                            height: 360}} />}
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{props.currentMovie.title}</h5>
                            <p className="card-text">{props.currentMovie.release_date.substring(6).split("-").concat(props.currentMovie.release_date.substring(0, 4)).join("/")}</p>
                            <p className="card-text">{props.currentMovie.overview}</p>
                        </div>
                    </div>            
                </div>

                </div>
            </div>
        </div>
    )
}

export default MovieInfo;