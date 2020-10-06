import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
//import { BrowserRouter as Router, Link } from 'react-router-dom';

//import Intra42 from 'intra42';


function ResetPass(props) {

    const [user, setUser] = useState({
        password: "",
        confirm: ""
    })

    const history = useHistory();
    const submit = e => {
        e.preventDefault()

        fetch('http://localhost:5000/resetPass', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'content-Type': 'application/json' }
        })
            .then(res => {
                console.log(`req successful ${res.status}`);
                if (res.status === 401)
                    history.push('/password')
                else if (res.status === 200)
                    history.push('/login')

            })
            .catch(error => console.log(error))


    }

    const handleChange = (e) => {
        e.persist();
        // debugger
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
                        <h5 className="card-title mb-5">enter new password</h5>
                        <form onSubmit={submit}>
                            <div className="form-group">
                                 <label for="newPassword">enter new password</label>
                                <input type="password" className="form-control" name="newPassword" required onChange={handleChange} value={user.confirm} />
                            </div>
                            <div className="form-group">
                                <label for="NewPassword"> confirm Password</label>
                                <input type="password" className="form-control" name="confirmPassword" required onChange={handleChange} value={user.confirm}/>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    );
}

export default ResetPass;