import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import registerApi from './registerApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

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

  const passwordy = (value) => {
    if (value.length < 6 || value.length >20) {
    console.log(value.length)
    console.log(value)}
};

  const history = useHistory();
  const submit = e => {
    e.preventDefault()
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

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = state.errors;

    switch (name) {
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

    setState({errors, [name]: value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(validateForm(state.errors)) {
      console.info('Valid Form')
    }else{
      console.error('Invalid Form')
    }
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
                      <input value={state.firstname} onChange={handleChange} type="text" className="form-control" id="Name" name="firstname" placeholder="enter name" required />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-10">
                      <label for="UserLastName">lastname</label>
                      <input value={state.lastname} onChange={handleChange} type="text" className="form-control" id="lastname" placeholder="enter last name" name="lastname"
                        required noValidate />
                      
              {state.errors.email.length > 0 && 
                <span className='error'>{state.errors.email}</span>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-10">
                      <label for="UserEmail">email</label>
                      <input value={state.email} onChange={handleChange} type="email" className="form-control" id="email" placeholder="enter email" name="email"
                        required />
                    </div>
                  </div>
                  <div className="form-group row">

                    <div className="col-sm-10 col-lg-6">
                      <label for="Password">Password</label>
                      <input value={state.password} type="password" className="form-control" id="password" placeholder="enter Password" validations={passwordy.value}
                        name="password" onChange={handleChange} title="Must have digits, caps and small letters" require="true" />
                    </div>
                    <div className="col-sm-10 col-lg-6">
                      <label for="Password">confirm password</label>
                      <input value={state.confirm} type="password" className="form-control" id="passwordconfirm" placeholder="enter Password"
                        name="confirm" onChange={handleChange} title="Must have digits, caps and small letters"
                        require="true" noValidate />
                        {state.errors.password.length > 0 && 
                          <span className='error'>{state.errors.password}</span>}
                        
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