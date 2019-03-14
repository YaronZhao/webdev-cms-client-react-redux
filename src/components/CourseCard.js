import React from 'react'
import {Link} from 'react-router-dom'

const CourseCard = ({course, deleteCourse, selectCourse}) =>
    <div className="card course-card px-0">
        <div className="card-body">
            <img className="card-img-top"
                 src="https://picsum.photos/300/200"
                 alt="Default"/>
            <h5 className="card-title mt-2 mb-1">
                Title: {course.title}
            </h5>
            <p className="card-text">
                Id: {course.id}
            </p>
            <Link to={`/course/${course.id}/edit`}
                  className="btn btn-success btn-block"
                  role="button"
                  onClick={() => selectCourse(course)}>Edit</Link>
            <a href="#"
               className="btn btn-primary btn-block"
               role="button"
               onClick={() => deleteCourse(course.id)}>Delete</a>
        </div>
    </div>;

export default CourseCard;
