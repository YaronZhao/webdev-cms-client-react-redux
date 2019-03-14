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
            users: [],
            currentUser: {},
            courses: [],
            selectedCourse: {}
        };
    }

    componentDidMount() {
        this.findAllCourses();
        this.findAllUsers()
    }

    findAllUsers = () => {
        this.userService.findAllUsers()
            .then(users => this.setState({
                users: users
            }))
    };

    login = user => {
        this.userService.login(user)
            .then(user => this.setState({
                loggedIn: true,
                currentUser: user
            }))
            .catch(() => alert("User Not Found! Please try again."))
    };

    register = newUser => {
        this.userService.register(newUser)
            .then(user => this.setState({
                loggedIn: true,
                currentUser: user
            }))
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
        this.courseService.findCourseById(course.id)
            .then(c => this.setState({
                selectedCourse: c
            }))
    };

    findAllCourses = () => {
        this.courseService.findAllCourses()
            .then(courses => this.setState({
                courses: courses
            }))
    };

    addCourse = newCourse => {
        console.log(newCourse);
        this.courseService.createCourse(newCourse)
            .then(() => this.findAllCourses())
    };

    updateCourse = (courseId, updatedCourse) => {
        this.courseService.updateCourse(courseId, updatedCourse)
            .then(() => this.findAllCourses())
    };

    deleteCourse = courseId => {
        this.courseService.deleteCourse(courseId)
            .then(() => this.findAllCourses())
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
                                        selectedCourse={this.state.selectedCourse}
                                        createLesson={this.createLesson}
                                        updateLesson={this.updateLesson}
                                        deleteLesson={this.deleteLesson}
                                        createTopic={this.createTopic}
                                        updateTopic={this.updateTopic}
                                        deleteTopic={this.deleteTopic}/>}/>
                        <Route
                            path="/profile"
                            render={() =>
                                <ProfileComponent
                                    currentUser={this.state.currentUser}
                                    hideAlert={true}
                                    updateUser={this.updateUser}/>}/>
                        <Route path="/register"
                               render={() => <RegisterComponent
                                                register={this.register}
                                                users={this.state.users}/>}/>
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