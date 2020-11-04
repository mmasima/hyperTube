import React, { useState } from 'react';
import auth from '../../config/auth';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import loginApi from './loginApi'


const Login = (props) => {
    const [state, setState] = useState({
        username: "",
        password: "",
    })
    const history = useHistory();
    const submit = e => {
        e.preventDefault()
            loginApi(state.username, state.password)
            .then((res) => {
                console.log(`req successful ${res.status}`);
                if (res.status === 401) {
                    console.log("failed to login");
                    history.push('/')
                }
                else if (res.status === 200) {
                        localStorage.setItem('login', JSON.stringify({
                            token: res.data.token
                        }))
                        auth.login(() => {
                            history.push('mainPage');
                        })

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
                                        <label>username</label>
                                        <input type="text" className="form-control" id="username" onChange={handleChange} value={state.username}
                                            name="username" placeholder="Enter username" required />
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" id="password" name="password" onChange={handleChange} value={state.password}
                                            placeholder="Password" required />
                                    </div>
                                    <div className="mt-5 mb-2">

                                        <button className="btn btn-primary">
                                            <a href="http://localhost:5000/google">
                                                google login
                                            </a>
                                        </button>
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