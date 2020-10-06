import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';

function ForgotPass() {
    const[user, setUser] = useState({
        email: ""
    })

    const history = useHistory();
    const submit = e => {
        e.preventDefault()

        fetch('http://localhost:5000/forgotPass', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'content-Type': 'application/json' }
        })
            .then(res => {
                console.log(`req successful ${res.status}`);
                if (res.status === 401)
                    history.push('/forgotPass')
                else if (res.status === 200)
                    history.push('/')

            })
            .catch(error => console.log(error))
    }
    const handleChange = (e) => {
        e.persist();
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-5">
                    <div className="card  text-white bg-dark mb-3">
                        <div className="card-body">
                            <h5 className="card-title mb-5">enter email address</h5>
                            <form onSubmit={submit} >
                                <div className="form-group">
                                    <input type="email" placeholder="enter email" className="form-control" onChange={handleChange}  name="email" value={user.email} required/>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPass;