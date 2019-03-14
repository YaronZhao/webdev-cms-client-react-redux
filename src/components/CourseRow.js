import React from 'react'
import {Link} from 'react-router-dom'

const CourseRow = ({course, deleteCourse, selectCourse}) =>
    <div className="row mx-0">
        <div className="d-none d-sm-block left-blank"/>
        <div className="col border course-item">
            <table className="table table-borderless course-table-content">
                <tbody>
                    <tr className="row">
                        <td className="course-content-title">
                            <Link to={`/course/${course.id}/edit`}
                                  style={{ textDecoration: 'none'}}>
                                <span onClick={() => selectCourse(course)}>
                                    <i className="fas fa-file-alt fa-2x course-icon"/>
                                    Title: {course.title}, Id: {course.id}
                                </span>
                            </Link>
                        </td>
                        <td className="d-none d-sm-block col course-content-owner">me</td>
                        <td className="d-none d-sm-block col course-content-modify-time">6:45 PM</td>
                        <td className="course-content-view-delete">
                            <span className="align-middle"
                                  role="button"
                                  onClick={() => deleteCourse(course.id)}>X</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="d-none d-sm-block right-blank"/>
    </div>;

export default CourseRow;
