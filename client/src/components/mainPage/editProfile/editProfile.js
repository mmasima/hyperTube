import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditProfile() {

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <h5 className="navbar-brand">HyperTube</h5>
                <div className="mr-sm-2">
                    <button className="btn btn-secondary mr-2">
                        edit profile
                    </button>
                    <button className="btn btn-secondary">
                        logout
                    </button>
                </div>
            </nav>
            <div className="container mt-5">
                <div className="row">
                    <div className="col">
                        <form action="">
                            <div class="form-row">
                                <div class="col-md-6 mb-3">
                                    <label for="validationCustom01">change First name</label>
                                    <input type="text" class="form-control" id="validationCustom01" value="" required />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="validationCustom02">change Last name</label>
                                    <input type="text" class="form-control" id="validationCustom02" value="" required />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-md-6 mb-3">
                                    <label for="validationCustom01">change password</label>
                                    <input type="text" class="form-control" id="validationCustom01" value="" required />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="validationCustom02">confirm new password</label>
                                    <input type="text" class="form-control" id="validationCustom02" value="" required />
                                </div>
                            </div>
                            <button class="btn btn-primary" type="submit">Submit form</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;