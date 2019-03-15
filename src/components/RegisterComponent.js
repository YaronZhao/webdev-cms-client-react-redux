import React from 'react'
import {Link} from "react-router-dom";
import '../styles/login-register-profile.style.client.css'

const RegisterComponent = ({register}) =>
    <div className="px-3 pt-3">
        <h1>Sign Up</h1>
        <div className="form-group row">
            <label htmlFor="usernameFld" className="col-sm-2 col-form-label">Username</label>
            <div className="col-sm-10">
                <input className="form-control"
                       id="usernameFld"
                       placeholder="Yaron"/>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="passwordFld"
                   className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
                <input type="password"
                       className="form-control wbdv-password-fld"
                       id="passwordFld"
                       placeholder="WebDev-123*"/>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="verifyPasswordFld" className="col-sm-2 col-form-label">Verify Password</label>
            <div className="col-sm-10">
                <input type="password"
                       className="form-control wbdv-password-fld"
                       id="verifyPasswordFld"
                       placeholder="WebDev-123*"/>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="usernameFld"
                   className="col-sm-2 col-form-label">First Name</label>
            <div className="col-sm-10">
                <input className="form-control"
                       id="firstNameFld"
                       placeholder="Yaron"/>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="usernameFld" className="col-sm-2 col-form-label">Last Name</label>
            <div className="col-sm-10">
                <input className="form-control"
                       id="lastNameFld"
                       placeholder="Yaron"/>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="phoneFld" className="col-sm-2 col-form-label">Phone</label>
            <div className="col-sm-10">
                <input type="tel"
                       className="form-control"
                       id="phoneFld"
                       placeholder="(666) 456-3333"/>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="emailFld" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
                <input type="email"
                       className="form-control"
                       id="emailFld"
                       placeholder="yaron@huskyland.com"/>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="role" className="col-sm-2 col-form-label">Role</label>
            <div className="col-sm-10 input-group mb-3">
                <select className="custom-select"
                        id="roleFld"
                        defaultValue="Faculty">
                    <option value="Faculty">Faculty</option>
                    <option value="Student">Student</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="birthDate" className="col-sm-2 col-form-label">Date of Birth</label>
            <div className="col-sm-10">
                <input type="date"
                       className="form-control"
                       id="birthDate"
                       placeholder="mm/dd/yyyy"/>
            </div>
        </div>
        <div className="form-group row">
            <label className="col-sm-2 col-form-label"/>
            <div className="col-sm-10">
                <Link to="/course/table"
                      id="registerBtn"
                      className="btn btn-primary btn-block"
                      role="button"
                      onClick={() => register({
                          "userName": document.getElementById("usernameFld").value,
                          "password": document.getElementById("passwordFld").value,
                          "firstName": document.getElementById("firstNameFld").value,
                          "lastName": document.getElementById("lastNameFld").value,
                          "email": document.getElementById("emailFld").value,
                          "phone": document.getElementById("phoneFld").value,
                          "role": document.getElementById("roleFld").value,
                          "courses": []
                      })}>
                    Sign up
                </Link>
                <div className="row">
                    <div className="col-6">
                        <Link to="/login">Login</Link>
                    </div>
                    <div className="col-6">
                        <a href="#"
                           className="float-right"
                           onClick={() => window.history.back()}>
                            Cancel
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>;

export default RegisterComponent;