import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Registration extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: ''
        }
    }


    render() {
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
                    <form action="/" method="POST">
                      <div class="form-group row mt-4">
                        <div class="col-sm-10 col-lg-10">
                          <label for="userName">username</label>
                          <input type="text" class="form-control" id="userName" name="userName" placeholder="enter username"
                            required />
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="col-sm-10 col-lg-10">
                          <label for="userName">Name</label>
                          <input type="text" class="form-control" id="Name" name="Name" placeholder="enter name" required />
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="col-sm-10">
                          <label for="UserLastName">lastname</label>
                          <input type="text" class="form-control" id="lastName" placeholder="enter last name" name="lastName"
                            required />
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="col-sm-10">
                          <label for="UserEmail">email</label>
                          <input type="email" class="form-control" id="userEmail" placeholder="enter email" name="userEmail"
                            required />
                        </div>
                      </div>
                      <div class="form-group row">
        
                        <div class="col-sm-10 col-lg-6">
                          <label for="Password">Password</label>
                          <input type="password" class="form-control" id="Password" placeholder="enter Password"
                            name="userPassword" minlength="6" title="Must have digits, caps and small letters"
                            pattern="(?=\S*\d)(?=\S*[a-z])(?=\S*[A-Z])\S*" require />
                        </div>
                        <div class="col-sm-10 col-lg-6">
                          <label for="confirmPassword">confirm</label>
                          <input type="password" class="form-control" id="confirmPassword" placeholder="Re-enter Password"
                            name="confirmPassword" required />
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
}

export default Registration;