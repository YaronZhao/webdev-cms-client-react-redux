import React, {Component} from 'react'
import {Router, Route} from "react-router-dom";
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
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

class WhiteBoard extends Component {
    constructor(props) {
        super(props);
        this.courseService = CourseService.getInstance();
        this.userService = UserService.getInstance();
        this.state = {
            currentUser: null,
            selectedCourse: null
        };
    }

    login = user => {
        document.getElementById('loginBtn').disabled = true;
        let spinner = document.getElementById('loadingSpinner');
        spinner.classList.remove('d-none');
        spinner.classList.add('d-flex');
        this.userService.login(user)
            .then(user => {
                this.setState({ currentUser: user });
                localStorage.setItem('currentUser', JSON.stringify(user));
            })
            .catch(() => alert("User Not Found! Please try again."))
            .finally(() => {
                document.getElementById('loginBtn').disabled = false;
                spinner.classList.remove('d-flex');
                spinner.classList.add('d-none');
                history.push('/course/table')
            })
    };

    register = newUser => {
        this.userService.register(newUser)
            .then(user => {
                this.setState({ currentUser: user });
                localStorage.setItem('currentUser', JSON.stringify(user));
            })
            .catch(() => alert("Username already taken."))
    };

    updateUser = (userId, updatedUser) => {
        this.userService.updateUser(userId, updatedUser)
            .then(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.setState({ currentUser: user });
                return user;
            })
            .catch(() => {
                alert("Failed to update the user");
                return null;
            })
    };

    logout = () => {
        this.userService.logout()
            .then(() => {
                localStorage.removeItem('currentUser');
                this.setState({ currentUser: null })
            })
            .catch(error => alert(error))
    };

    selectCourse = course => {
        this.setState({ selectedCourse: course });
        localStorage.setItem('selectedCourseTitle', course.title)
    };

    findUserById = userId => {
        this.userService.findUserById(userId)
            .then(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.setState({currentUser: user})
            })
            .catch(error => alert(error))
    };

    addCourse = (userId, newCourse) => {
        console.log(newCourse);
        this.courseService.createCourse(userId, newCourse)
            .then(() => this.findUserById(userId))
            .catch(error => alert(error))
    };

    deleteCourse = (userId, courseId) => {
        this.courseService.deleteCourse(userId, courseId)
            .then(() => this.findUserById(userId))
            .catch(error => alert(error))
    };

    render() {
        return (
            <Router history={history}>
                <div>
                    <Switch>
                        <Route
                            path="/course/table"
                            render={() =>
                                <CourseTable
                                    logout={this.logout}
                                    userId={JSON.parse(localStorage.getItem('currentUser')).id}
                                    courses={JSON.parse(localStorage.getItem('currentUser')).courses}
                                    addCourse={this.addCourse}
                                    deleteCourse={this.deleteCourse}
                                    selectCourse={this.selectCourse}/>}/>
                        <Route
                            path="/course/grid"
                            render={() =>
                                <CourseGrid
                                    logout={this.logout}
                                    userId={JSON.parse(localStorage.getItem('currentUser')).id}
                                    courses={JSON.parse(localStorage.getItem('currentUser')).courses}
                                    addCourse={this.addCourse}
                                    deleteCourse={this.deleteCourse}
                                    selectCourse={this.selectCourse}/>
                            }/>
                        <Route exact
                               path="/course/:id/edit"
                               render={(props) =>
                                    <CourseEditor
                                        {...props}
                                        userId={JSON.parse(localStorage.getItem('currentUser')).id}
                                        courseTitle={localStorage.getItem('selectedCourseTitle')}/>}/>
                        <Route
                            path="/profile"
                            render={() =>
                                <ProfileComponent
                                    currentUser={JSON.parse(localStorage.getItem('currentUser'))}
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
