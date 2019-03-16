import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom";
import '../styles/course-list.style.client.css'
import '../styles/course-editor.style.client.css'
import CourseService from '../services/CourseService'
import CourseTable from "./CourseTable";
import CourseGrid from "./CourseGrid";
import CourseEditor from "./CourseEditor";
import {Switch, Redirect} from "react-router";
import EntryComponent from "../components/EntryComponent";
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";
import ProfileComponent from "../components/ProfileComponent";
import UserService from "../services/UserService";

class WhiteBoard extends Component {
    constructor(props) {
        super(props);
        this.courseService = CourseService.getInstance();
        this.userService = UserService.getInstance();
        this.state = {
            loggedIn: false,
            currentUser: {},
            courses: [],
            selectedCourse: {}
        };
    }

    login = user => {
        this.userService.login(user)
            .then(user => {
                this.setState({
                    loggedIn: true,
                    currentUser: user
                });
                this.findAllCourses(user.id)
            })
            .catch(() => alert("User Not Found! Please try again."))
    };

    register = newUser => {
        this.userService.register(newUser)
            .then(user => {
                this.setState({
                    loggedIn: true,
                    currentUser: user
                });
                this.findAllCourses(user.id)
            })
            .catch(() => {
                this.setState({
                    loggedIn: false,
                });
                alert("Username already taken.");
            })
    };

    updateUser = (userId, updatedUser) => {
        this.userService.updateUser(userId, updatedUser)
            .then(user => {
                this.setState({
                    currentUser: user
                });
                return user;
            })
            .catch(() => {
                return null;
            })
    };

    logout = () => {
        this.userService.logout()
            .then(() => this.setState({
                loggedIn: false,
                currentUser: {},
                courses: []
            }))
    };

    selectCourse = course => {
        this.setState({
                selectedCourse: course
            })
    };

    findAllCourses = userId => {
        this.courseService.findAllCourses(userId)
            .then(courses => this.setState({
                courses: courses
            }))
    };

    addCourse = (userId, newCourse) => {
        console.log(newCourse);
        this.courseService.createCourse(userId, newCourse)
            .then(() => this.findAllCourses(userId))
    };

    updateCourse = (userId, courseId, updatedCourse) => {
        this.courseService.updateCourse(userId, courseId, updatedCourse)
            .then(() => this.findAllCourses(userId))
    };

    deleteCourse = (userId, courseId) => {
        this.courseService.deleteCourse(userId, courseId)
            .then(() => this.findAllCourses(userId))
    };

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        {this.state.loggedIn
                        && <Route path="/course/table"
                                  render={() =>
                                      <CourseTable
                                          logout={this.logout}
                                          userId={this.state.currentUser.id}
                                          courses={this.state.courses}
                                          addCourse={this.addCourse}
                                          deleteCourse={this.deleteCourse}
                                          selectCourse={this.selectCourse}/>}
                        />}
                        <Route
                            path="/course/grid"
                            render={() =>
                                <CourseGrid
                                    logout={this.logout}
                                    userId={this.state.currentUser.id}
                                    courses={this.state.courses}
                                    addCourse={this.addCourse}
                                    deleteCourse={this.deleteCourse}
                                    selectCourse={this.selectCourse}/>
                            }/>
                        <Route exact
                               path="/course/:id/edit"
                               render={(props) =>
                                    <CourseEditor
                                        {...props}
                                        userId={this.state.currentUser.id}/>}/>
                        <Route
                            path="/profile"
                            render={() =>
                                <ProfileComponent
                                    currentUser={this.state.currentUser}
                                    hideAlert={true}
                                    updateUser={this.updateUser}/>}/>
                        <Route path="/register"
                               render={() => <RegisterComponent register={this.register}/>}/>
                        <Route path="/login" render={() => <LoginComponent login={this.login}/>}/>
                        <Route path="/" render={() => <EntryComponent/>}/>
                        <Redirect to="/"/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default WhiteBoard;