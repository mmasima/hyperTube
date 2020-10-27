import React from 'react';


const SearchArea = (props) => {
    return (
        <div className="container mt-5">
            <div className= "row">
                <section className="col-4 offset-2">
                    <form action="" onSubmit={props.handleSubmit} >
                        <div className="input-field">
                        <input className="form-control mr-sm-2 bg-light" type="search" placeholder="Search movie" onChange={props.handleChange} aria-label="Search" />
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default SearchArea;

