import React, { useState } from 'react'
import './Movie.css';
import axios from 'axios';

function Movie({dot}) {
    console.log('dot views',dot)
    const [moviename, setMoviename] = useState("")
    const [video, setVideo] = useState()

	const updateviews = async () => {
		const res = await axios.get(`http://localhost:9000/movieDetails/updateviews`, {
		});
		return await res.data; // (Or whatever)

    }
    

	let url = this.torrents[0].url
	var id = dot.id

	const submit = async () => {
        await axios.get(`http://localhost:5000/torrent?url=${url}&id=${id}&title=${dot.title}`,
        {}).then(res => {
			console.log('res.data', res.data);
			if (res.data.message) {
				let videoplay = `http://localhost:5000/torrent/video?movie=${res.data.message}`
				setVideo(videoplay)
				let nameonly = res.data.message
				setMoviename(nameonly.substring(0, nameonly.length - 4) + '.srt')
				console.log('moviename', videoplay);
				console.log('videonnn', nameonly.substring(0, nameonly.length - 4) + '.srt');
			}
		})
			.catch(error => console.log(error))
	}
const Movie = (props) => {
    return (
        <div className="col col-md-3 col-lg-3">
            <div className="card mt-5">
                {
                    props.image == null ? <img src={`https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`} className="card-img-top" alt="card image"/> 
                    : <img src={`http://image.tmdb.org/t/p/w185${props.image}`} className="card-img-top" alt="card image"/>
                }
                <div class="card-body">
                    <h5 class="card-title">{props.data.title}</h5>
                    <p><button class="btn btn-primary" onClick={() => props.viewMovieInfo(props.movieId)}>View Details</button></p>
                    <p><a href="http://localhost:3000/video">Watch</a></p>
                    <input onClick={submit} type="submit" value={'download'} Download/>                   
                </div>
            </div>
        </div>
    )
}}

export default Movie;