import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/login-register-profile.style.client.css'

const ProfileComponent = ({currentUser, hideAlert, updateUser}) =>
    <div className="px-3 pt-3">
        <h1>Profile</h1>
        <div className="alert alert-success"
             role="alert"
             id="alert"
             style={hideAlert ? {display: 'none'} : {display: 'block'}}>
            Profile successfully saved
        </div>
        <div className="form-group row">
            <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
            <div className="col-sm-10">
                <input className="form-control"
                       id="usernameFld"
                       readOnly
                       placeholder={currentUser.userName}/>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="username" className="col-sm-2 col-form-label">First Name</label>
            <div className="col-sm-10">
                <input className="form-control"
                       id="firstNameFld"
                       readOnly
                       placeholder={currentUser.firstName}/>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="username" className="col-sm-2 col-form-label">Last Name</label>
            <div className="col-sm-10">
                <input className="form-control"
                       id="lastNameFld"
                       readOnly
                       placeholder={currentUser.lastName}/>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="phoneFld" className="col-sm-2 col-form-label">Phone</label>
            <div className="col-sm-10">
                <input type="tel"
                       className="form-control"
                       id="phoneFld"
                       placeholder={currentUser.phone}/>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="emailFld" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
                <input type="email"
                       className="form-control"
                       id="emailFld"
                       placeholder={currentUser.email}/>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="role" className="col-sm-2 col-form-label">Role</label>
            <div className="col-sm-10 input-group mb-3">
                <select className="custom-select profile-role"
                        id="roleFld"
                        disabled
                        defaultValue={currentUser.role}>
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
                       readOnly
                       placeholder="mm/dd/yyyy"/>
            </div>
        </div>
        <div className="form-group row">
            <label className="col-sm-2 col-form-label"/>
            <div className="col-sm-10">
                <button
                    className="btn btn-success btn-block"
                    onClick={() => {
                        let updatedUser = {
                            "id": currentUser.id,
                            "userName": currentUser.userName,
                            "password": currentUser.password,
                            "firstName": currentUser.firstName,
                            "lastName": currentUser.lastName,
                            "email": document.getElementById("emailFld").value,
                            "phone": document.getElementById("phoneFld").value,
                            "role": currentUser.role,
                            "courses": currentUser.courses
                        };
                        let result = updateUser(currentUser.id, updatedUser);
                        if (result !== null) {
                            document.getElementById("alert").style.display = 'block';
                        } else {
                            document.getElementById("alert").innerHTML = "User Not Found!";
                            document.getElementById("alert").style.display = 'block';
                        }
                    }}>
                    Update
                </button>
            </div>
        </div>
        <div className="form-group row">
            <label className="col-sm-2 col-form-label"/>
            <div className="col-sm-10">
                <Link to="/"
                      className="btn btn-danger btn-block"
                      role="button">
                    Logout
                </Link>
            </div>
        </div>
    </div>;

export default ProfileComponent;