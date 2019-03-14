import React from 'react'
import CourseListNavBar from "../components/CourseListNavBar";
import CourseRow from "../components/CourseRow";
import TableHead from "../components/TableHead";

const CourseTable = ({logout, courses, addCourse, deleteCourse, selectCourse}) =>
    <div>
        <CourseListNavBar
            courses={courses}
            addCourse={addCourse}
            logout={logout}/>
        <TableHead/>
        {
            courses.map((course) => (
                <CourseRow
                    course={course}
                    key={course.id}
                    deleteCourse={deleteCourse}
                    selectCourse={selectCourse}/>
            ))
        }
        <span id="addNewCourseBottom"
              className="fa-stack fa-1x"
              role="button"
              onClick={() =>
                  addCourse({
                      "id": courses.length === 0 ?
                                (new Date()).getMilliseconds() :
                                courses[courses.length - 1].id + 1,
                      "title": "New Course",
                      "modules": []
                  })
              }
        >
            <i className="fas fa-circle fa-stack-2x"/>
            <i className="fas fa-plus fa-stack-1x fa-inverse"/>
        </span>
    </div>;

export default CourseTable;