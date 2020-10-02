import React from 'react';

function VideoPlayer() {
    return(
        <div className="container">
            <div className="row">
                <div className="col m-auto pt-4">
                    <h1 className="text-center mb-5">
                        watch movie
                    </h1>
                    <video controls width="100%">
                        ....
                        ....

                        Sorry, your browser doesn't support embedded videos.
                    </video>
                </div>
            </div>
        </div>
    )
}

export default VideoPlayer;