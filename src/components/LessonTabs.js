import React, {Component} from 'react'
import LessonTab from "./LessonTab";

class LessonTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newLessonTitle: "",
        }
    }

    updateForm = event => {
        this.setState({
            newLessonTitle: event.target.value
        });
        console.log(this.state.newLessonTitle)
    };

    render() {
        return (
            <div id="top-nav" className="border-bottom border-secondary">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <span className="navbar-brand mb-0" id="courseName">
                        <span className="fas fa-arrow-left fa-2x"
                              role="button"
                              id="topLeftBackBtn"
                              onClick={() => window.history.back()}/>
                        {this.props.courseTitle}
                    </span>
                    <a className="btn btn-info"
                       data-toggle="collapse"
                       href="#left-nav"
                       role="button"
                       aria-expanded="true">
                        All Modules
                    </a>
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
                        <ul className="navbar-nav nav-tabs mr-0 border-0 nav justify-content-end top-lesson-tabs">
                            {
                                this.props.lessons.map((lesson, index) => (
                                    <LessonTab
                                        key={index}
                                        index={index}
                                        userId={this.props.userId}
                                        courseId={this.props.courseId}
                                        moduleId={this.props.moduleId}
                                        lessons={this.props.lessons}
                                        lessonId={lesson.id}
                                        lesson={lesson}
                                        selected={this.props.selectedLesson === lesson}
                                        selectLesson={this.props.selectLesson}
                                        updateLesson={this.props.updateLesson}
                                        deleteLesson={this.props.deleteLesson}/>
                                ))
                            }
                            <li className="nav-item ml-4" id="newLessonTitleLi">
                                <label>
                                    <input id="newLessonTitle"
                                           type="text"
                                           onChange={this.updateForm}/>
                                </label>
                            </li>
                            <li className="nav-item" id="addNewLessonLi">
                                <span className="fas fa-plus fa-2x"
                                      id="addNewLessonBtn"
                                      role="button"
                                      onClick={() =>
                                          this.props.createLesson(
                                              this.props.userId,
                                              this.props.courseId,
                                              this.props.moduleId,
                                              {
                                                  title: (this.state.newLessonTitle === "") ?
                                                              "New Lesson" : this.state.newLessonTitle,
                                                  topics: []
                                              })}/>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default LessonTabs;
