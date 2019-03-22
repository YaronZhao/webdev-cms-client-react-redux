import React from 'react'
import CourseListNavBar from "../components/CourseListNavBar";
import CourseRow from "../components/CourseRow";
import TableHead from "../components/TableHead";

const CourseTable = ({logout, userId, courses, addCourse, deleteCourse, selectCourse}) =>
    <div>
        <CourseListNavBar
            userId={userId}
            courses={courses}
            addCourse={addCourse}
            logout={logout}/>
        <TableHead/>
        {
            courses.map((course) => (
                <CourseRow
                    userId={userId}
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
                  addCourse(userId, {
                      title: "New Course",
                      modules: []
                  })
              }>
            <i className="fas fa-circle fa-stack-2x"/>
            <i className="fas fa-plus fa-stack-1x fa-inverse"/>
        </span>
    </div>;

export default CourseTable;