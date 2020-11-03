import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import auth from '../../../config/auth';
import profileApis from './ProfileApis';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditProfile(props) {
    const [state, setState] = useState({
        username: "",
        firstname: "",
        lastname: "",
        password: "",
        selectedFile: null,
        confirm: "",
        isLoaded: true
    })
    
    const user = JSON.parse(localStorage.getItem("userDetails"));

    const history = useHistory();

    // upload image start
    const fileSelectedHandler = event => {
        setState({
            selectedFile: event.target.files[0]
        })
    }
    const fileUpload = (e) => {
        e.preventDefault()
        profileApis.fileUpload(state.selectedFile)
            .then((res) => {
                if (res.status === 500) {
                    history.push('editProfile');
                }
                else if (res.status === 200) {
                    history.push('mainPage')
                }
            })
    }
    //upload image end

    //change preofile details 
    const submit = (e) => {
        e.preventDefault()
        profileApis.submitProfile(state.username, state.firstname, state.lastname, state.password, state.confirm)
            .then((res) => {
                if (res.status === 401) {
                    console.log("it didnt work")
                }
                else if (res.status === 200) {
                    history.push('mainPage');
                }
            })
    }

    const handleChange = (e) => {
        e.persist();
        debugger
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }

    const logout = () => {
        localStorage.removeItem('login');
        localStorage.removeItem('userDetails');
        auth.logout(() => {
            props.history.push("/");
        });
    }

    const loggedIn = () => {
        auth.login(() => {
            props.history.push('mainPage');
        })
    };
    const userImage = `http://localhost:5000/images/${user.user.image}`;
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <h5 className="navbar-brand">HyperTube</h5>
                <div className="mr-sm-2">
                    <button className="btn btn-secondary mr-2" onClick={loggedIn}>
                        Home
                    </button>
                    <button className="btn btn-secondary" onClick={logout}>
                        logout
                    </button>
                </div>
            </nav>
            {   state.isLoaded === false ?
                <div className="spinner-grow" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            :
            <div className="container mt-5">
                <div className="row">
                    <div className="col">
                        <div className="row justify-content-center">
                            <div className=" col-lg-6 card text-align-center">
                                <img src={userImage} height="200px" width="150px" className="card-img-top" alt={userImage} />
                                <label >change image</label>
                                <input type="file" className="form-control" name="image" onChange={fileSelectedHandler} />
                                <button onClick={fileUpload} className="btn btn-primary mt-5" type="submit">Submit image</button>
                                <div className="card-body mt-2">
                                    <label >username</label>
                                    <h5 className="card-title mt-2">{user.user.username}</h5>
                                    <label >name</label>
                                    <h5 className="card-title mt-2">{user.user.name}</h5>
                                    <label >surname</label>
                                    <h5 className="card-title mt-2">{user.user.lastname}</h5>
                                    <label >email</label>
                                    <h5 className="card-title mt-2">{user.user.email}</h5>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={submit}>
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label>change username</label>
                                    <input type="text" className="form-control" id="validationCustom01" name="username" value={state.username} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label >change First name</label>
                                    <input type="text" className="form-control" id="validationCustom01" name="firstname" value={state.firstname} onChange={handleChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label >change Last name</label>
                                    <input type="text" className="form-control" id="validationCustom02" name="lastname" value={state.lastname} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label >change password</label>
                                    <input type="text" className="form-control" id="validationCustom01" name="password" value={state.password} onChange={handleChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label >confirm new password</label>
                                    <input type="text" className="form-control" id="validationCustom02" name="confirm" value={state.confirm} onChange={handleChange} />
                                </div>
                            </div>
                            <button className="btn btn-primary" type="submit">Submit form</button>
                        </form>
                    </div>
                </div>
            </div>
        }
        </div>
            
    )
}

export default EditProfile;