import React from 'react';


const SearchArea = (props) => {
    return (
        <div className="container mt-5 mb-3">
            <form action="" onSubmit={props.handleSubmit} >
            <div className= "row">
                <div className="col-8">
                        <div className="input-field">
                        <input className="form-control bg-light" type="search" placeholder="Search movie" onChange={props.handleChange} aria-label="Search" />
                        </div>
                </div>
                <div className="col-4">
                    <button type="submit" className="btn btn-dark">search</button>
                </div>
                </div>
            </form>
        </div>
    )
}

export default SearchArea;

