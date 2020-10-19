import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import auth from '../../../config/auth';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditProfile(props) {
    const [state, setState] = useState({
        username: "",
        firstname: "",
        lastname: "",
        password: "",
        selectedFile: null,
        confirm: ""
    })
    var token = JSON.parse(localStorage.getItem("login"));
    const history = useHistory();

    // upload image start

    const fileSelectedHandler = event => {
        setState({
            selectedFile: event.target.files[0]
        })
    }
    const fileUpload = async (e) => {
        e.preventDefault()
        console.log("hello world1");
        console.log(state.selectedFile);
        const fd = new FormData();
        fd.append('image',  state.selectedFile);
        console.log({fd});
        const data = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-auth-token': `${token.token}`

            }
        }
        axios.post('http://localhost:5000/uploadImage', fd, data)
            .then(res => {
                console.log(res)
            });
    }
    //upload image end

    //change preofile details 
    const submit = e => {
        e.preventDefault()
        fetch('http://localhost:5000/editProfile', {
            method: 'POST',
            body: JSON.stringify(state),
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': `${token.token}`
            },
        })
            .then(res => {
                console.log(`req successful ${res.status}`);
                if (res.status === 401)
                    history.push('editProfile')
                else if (res.status === 200) {
                    history.push('mainPage')
                }

            })
            .catch(error => console.log(error))
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
        auth.logout(() => {
            props.history.push("/");
        });
    }

    const loggedIn = () => {
        auth.login(() => {
            props.history.push('mainPage');
        })
    }

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
            <div className="container mt-5">
                <div className="row">
                    <div className="col">
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label >change image</label>
                                    <input type="file" className="form-control" name="image" onChange={fileSelectedHandler} />
                                    <button onClick={fileUpload} className="btn btn-primary mt-5"   type="submit">Submit image</button>
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
        </div>
    )
}

export default EditProfile;