import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';



const Login = () => {
    const[state, setState] = useState ({
        username: "",
        password: "",
      })
      const history = useHistory();
      const submit = e => {
        e.preventDefault()
        fetch('http://localhost:5000/login', {
            method: 'POST',
            body: JSON.stringify(state),
            headers: {'Content-Type': 'application/json'},
        })
          .then(res => {
                console.log(`req successful ${res.status}`);
                if (res.status === 401)
                    history.push('/')
                else if (res.status === 200)
                {
                  history.push('/')
                }

            })
         .catch(error => console.log(error))
    } 
    const handleChange = (e) =>{
        e.persist();
        debugger
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }
    return (


        <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-lg-5">               
                <div class="card bg-dark">
                    <div class="card-body text-white">
                        <h3 class="text-center white">
                            login below
                        </h3>
                        <form onSubmit={submit}>
                            <div class="form-group">                             
                                <labelX>username</labelX>
                                <input type="text" class="form-control" id="username" onChange={handleChange} value={state.username}
                                    name="username" placeholder="Enter username" required />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" id="password" name="password" onChange={handleChange} value={state.password}
                                    placeholder="Password" required />
                            </div>
                            <div class="modal-footer">
                                <button type="button btn-primary" class="btn btn-secondary">
                                    <a href="frgotpsswrd">forgot password</a>
                                </button>
                                <button type="submit" class="btn btn-secondary">login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Login;