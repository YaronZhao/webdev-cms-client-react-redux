import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/login-register-profile.style.client.css'

const LoginComponent = ({login}) =>
    <div className="px-3 pt-3">
        <h1>Sign In</h1>
        <div className="form-group row">
            <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
            <div className="col-sm-10">
                <input className="form-control" id="username" placeholder="Yaron"/>
            </div>
            </div>
            <div className="form-group row">
                <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                    <input type="password"
                           className="form-control wbdv-password-fld"
                           id="password"
                           placeholder="WebDev-123*"/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="role" className="col-sm-2 col-form-label">Role</label>
                <div className="col-sm-10 input-group mb-3">
                    <select
                        className="custom-select"
                        id="role"
                        defaultValue="Faculty">
                        <option value="Faculty">Faculty</option>
                        <option value="Student">Student</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label"/>
                <div className="col-sm-10">
                    <Link to="/course/table"
                          className="btn btn-primary btn-block"
                          onClick={() => login({
                              "userName": document.getElementById("username").value,
                              "password": document.getElementById("password").value,
                              "role": document.getElementById("role").value
                          })}>
                        Sign in
                    </Link>
                    <div className="row">
                        <div className="col-6">
                            <a href="#">Forgot Password?</a>
                        </div>
                        <div className="col-6">
                            <Link to="/register" className="float-right">Sign up</Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6"/>
                        <div className="col-6">
                            <a href="#"
                               className="float-right"
                               onClick={() => window.history.back()}>Cancel
                            </a>
                        </div>
                    </div>
                    <div id="loadingSpinner" className="d-none justify-content-center">
                        <strong className="text-primary">Loading...</strong>
                        <div className="spinner-border ml-2 text-primary" role="status" aria-hidden="true"/>
                    </div>
                </div>
            </div>
    </div>;

export default LoginComponent;
