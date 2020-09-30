import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



const Login = () => {
    return (
        <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-lg-5">               
                <div class="card bg-dark">
                    <div class="card-body text-white">
                        <h3 class="text-center white">
                            login below
                        </h3>
                        <form action="/login" method="POST">
                            <div class="form-group">                             
                                <labelX>username</labelX>
                                <input type="text" class="form-control" id="username" aria-describedby="emailHelp"
                                    name="username" placeholder="Enter username" required />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" id="confirmPassword" name="password"
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