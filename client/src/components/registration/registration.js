import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



function Registration() {
    const[state, setState] = useState ({
      username: "",
      firstname: "",
      lastname:"",
      email: "",
      password: "",
      confirm: ""
    })
    const history = useHistory();
    const submit = e => {
        e.preventDefault()
        fetch('http://localhost:5000/register', {
            method: 'POST',
            body: JSON.stringify(state),
            headers: {'Content-Type': 'application/json'},
        })
          .then(res => {
                console.log(`req successful ${res.status}`);
                if (res.status === 401)
                    history.push('/register')
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
            <div class="container mt-4">
            <h2 class="text-center text-white mb-4" >
              Stream movies online
            </h2>
            <div class="row justify-content-center">
              <div class="col-lg-5">
                <div class="card text-white bg-dark mb-3">
                  <div class="card-body">
                    <h5 class="card-title">Register below</h5>
                    <form onSubmit={submit}>
                      <div class="form-group row mt-4">
                        <div class="col-sm-10 col-lg-10">
                          <label for="userName">username</label>
                          <input value={state.username}   onChange={handleChange} type="text" class="form-control" id="username" name="username" placeholder="enter username"
                            required />
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="col-sm-10 col-lg-10">
                          <label for="userName">Name</label>
                          <input value={state.firstname}  onChange={handleChange} type="text" class="form-control" id="Name" name="firstname" placeholder="enter name" required />
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="col-sm-10">
                          <label for="UserLastName">lastname</label>
                          <input value={state.lastname} onChange={handleChange} type="text" class="form-control" id="lastname" placeholder="enter last name" name="lastname"
                            required />
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="col-sm-10">
                          <label for="UserEmail">email</label>
                          <input value={state.email} onChange={handleChange} type="email" class="form-control" id="email" placeholder="enter email" name="email"
                            required />
                        </div>
                      </div>
                      <div class="form-group row">
        
                        <div class="col-sm-10 col-lg-6">
                          <label for="Password">Password</label>
                          <input value={state.password}  type="password" class="form-control" id="password" placeholder="enter Password"
                            name="password" onChange={handleChange} title="Must have digits, caps and small letters"
                            require />
                        </div>
                        <div class="col-sm-10 col-lg-6">
                          <label for="Password">confirm password</label>
                          <input value={state.confirm}  type="password" class="form-control" id="password" placeholder="enter Password"
                            name="confirm" onChange={handleChange} title="Must have digits, caps and small letters"
                            require />
                        </div>
                      </div>
                      
                  <button type="submit" class="btn btn-secondary">Register!</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          </div>
        )
    }

export default Registration;