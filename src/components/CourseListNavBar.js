import React, {Component} from 'react'
import {Link} from "react-router-dom";

class CourseListNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newCourseTitle: ""
        }
    }

    updateForm = event => {
        this.setState({
            newCourseTitle: event.target.value
        });
        console.log(this.state.newCourseTitle)
    };

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Course Manager</a>
                <button className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div id="navbarSupportedContent" className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/profile" className="nav-link">
                                Profile
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/"
                                  className="nav-link"
                                  onClick={() => this.props.logout()}>
                                Logout
                            </Link>
                        </li>
                    </ul>
                    <input id="newCourseTitle"
                           className="form-control mr-sm-2"
                           type="text"
                           placeholder="New Course Title"
                           onChange={this.updateForm}/>
                    <span id="addCourseTop"
                          className="mt-2 fa-stack fa-1x"
                          role="button"
                          onClick={() =>
                              this.props.addCourse(this.props.userId, {
                                  "title": (this.state.newCourseTitle === "") ?
                                      "New Course" : this.state.newCourseTitle,
                                  "modules": []
                              })}>
                        <i className="fas fa-circle fa-stack-2x"/>
                        <i className="fas fa-plus fa-stack-1x fa-inverse"/>
                    </span>
                </div>
            </nav>
        )
    }
}

export default CourseListNavBar;