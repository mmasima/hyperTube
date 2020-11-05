import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { render } from 'react-dom';
import registerApi from './registerApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

toast.configure()
function Registration() {
  const [state, setState] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm: "",
    errors: {
      fullName: '',
      email: '',
      password: '',
    }
  })

  const history = useHistory();
  const submit = e => {
    e.preventDefault()
    if(state.password.length < 8)
    toast('Listen to the errors Buddy !')
    else
    registerApi(state.username, state.firstname, state.lastname, state.email, state.password, state.confirm)
      .then(res => {
        console.log(`req successful ${res.status}`);
        if (res.status === 401)
          history.push('/register')
        else if (res.status === 200) {
          history.push('/')
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
  

  const handleChangey = (e) => {
    e.persist();
    const { name, value } = e.target;
    let errors = state.errors;

    switch (name) {
      case 'fullName': 
        errors.fullName = 
          value.length < 5
            ? 'Full Name must be 5 characters long!'
            : '';
        break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'password': 
        errors.password = 
          value.length < 8
            ? 'Password must be 8 characters long!'
            : '';
        break;
      default:
        break;
    }

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
            <a href="http://localhost:3000/">
              login
            </a>
          </button>
        </div>
      </nav>
      <div className="container mt-4">
        <h2 className="text-center text-white mb-4" >
          Stream movies online
            </h2>
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="card text-white bg-dark mb-3">
              <div className="card-body">
                <h5 className="card-title">Register below</h5>
                <form onSubmit={submit}>
                  <div className="form-group row mt-4">
                    <div className="col-sm-10 col-lg-10">
                      <label for="userName">username</label>
                      <input value={state.username} onChange={handleChange} type="text" className="form-control" id="username" name="username" placeholder="enter username"
                        required />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-10 col-lg-10">
                      <label for="userName">Name</label>
                      <input value={state.firstname} onChange={handleChangey} type="text" className="form-control" id="Name" name="firstname" placeholder="enter name" required noValidate/>
                      {state.errors.fullName.length > 0 && 
                          <span className='error'>{state.errors.fullName}</span>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-10">
                      <label for="UserLastName">lastname</label>
                      <input value={state.lastname} onChange={handleChangey} type="text" className="form-control" id="lastname" placeholder="enter last name" name="lastname"
                        required noValidate />
                        {state.errors.fullName.length > 0 && 
                          <span className='error'>{state.errors.fullName}</span>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-10">
                      <label for="UserEmail">email</label>
                      <input value={state.email} onChange={handleChangey} type="email" className="form-control" id="email" placeholder="enter email" name="email"
                        required />
                        {state.errors.email.length > 0 && 
                        <span className='error'>{state.errors.email}</span>}
                    </div>
                  </div>
                  <div className="form-group row">

                    <div className="col-sm-10 col-lg-6">
                      <label for="Password">Password</label>
                      <input value={state.password} type="password" className="form-control" id="password" placeholder="enter Password"
                        name="password" onChange={handleChangey} title="Must have digits, caps and small letters" require="true" />
                        {state.errors.password.length > 0 && 
                          <span className='error'>{state.errors.password}</span>}
                    </div>
                    <div className="col-sm-10 col-lg-6">
                      <label for="Password">confirm password</label>
                      <input value={state.confirm} type="password" className="form-control" id="passwordconfirm" placeholder="enter Password"
                        name="confirm" onChange={handleChange} title="Must have digits, caps and small letters"
                        require="true" />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-secondary">Register!</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registration;