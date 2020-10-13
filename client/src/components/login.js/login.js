import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';



const Login = () => {
    const [state, setState] = useState({
        username: "",
        password: "",
    })
    const history = useHistory();
    const submit = e => {
        e.preventDefault()
        fetch('http://localhost:5000/login', {
            method: 'POST',
            body: JSON.stringify(state),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => {
                console.log(`req successful ${res.status}`);
                if (res.status === 401)
                    history.push('/')
                else if (res.status === 200) {
                    history.push('editProfile')
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
    return (

        <div>
            <nav className="navbar navbar-dark bg-dark">
                <h5 className="navbar-brand">HyperTube</h5>
                <div className="mr-sm-2">
                    <button className="btn btn-secondary">
                        <a href="http://localhost:3000/register">register</a>
                    </button>
                </div>
            </nav>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-lg-5">
                        <div className="card bg-dark">
                            <div className="card-body text-white">
                                <h3 className="text-center white">
                                    login below
                        </h3>
                                <form onSubmit={submit}>
                                    <div className="form-group">
                                        <labelX>username</labelX>
                                        <input type="text" className="form-control" id="username" onChange={handleChange} value={state.username}
                                            name="username" placeholder="Enter username" required />
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" id="password" name="password" onChange={handleChange} value={state.password}
                                            placeholder="Password" required />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button btn-primary" className="btn btn-secondary">
                                            <a href="http://localhost:3000/forgotPass">forgot password</a>
                                        </button>
                                        <button type="submit" className="btn btn-secondary">login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;