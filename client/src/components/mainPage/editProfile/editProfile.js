import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditProfile() {
    const [state, setState] = useState({
        username: "",
        firstname: "",
        lastname: "",
        password: "",
        confirm: ""
    })
    var token = JSON.parse(localStorage.getItem("login"));
    const history = useHistory();
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
                    <button className="btn btn-secondary mr-2">
                        <a href="http://localhost:3000/mainPage">Home</a>
                    </button>
                    <button className="btn btn-secondary">
                        logout
                    </button>
                </div>
            </nav>
            <div className="container mt-5">
                <div className="row">
                    <div className="col">
                        <form onSubmit={submit}>
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label for="validationCustom01">change username</label>
                                    <input type="text" className="form-control" id="validationCustom01" name="username" value={state.username} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label for="validationCustom01">change First name</label>
                                    <input type="text" className="form-control" id="validationCustom01" name="firstname" value={state.firstname} onChange={handleChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label for="validationCustom02">change Last name</label>
                                    <input type="text" className="form-control" id="validationCustom02" name="lastname" value={state.lastname} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label for="validationCustom01">change password</label>
                                    <input type="text" className="form-control" id="validationCustom01" name="password" value={state.password} onChange={handleChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label for="validationCustom02">confirm new password</label>
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