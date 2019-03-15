import React from 'react'
import CourseListNavBar from "../components/CourseListNavBar";
import CourseCard from "../components/CourseCard";
import TableHead from "../components/TableHead";

const CourseGrid = ({logout, userId, courses, addCourse, deleteCourse, selectCourse}) =>
    <div>
        <CourseListNavBar
            userId={userId}
            courses={courses}
            addCourse={addCourse}
            logout={logout}/>
        <TableHead/>
        {
            getCardRows(courses).map((courseRow, index) => (
                <div className="card-columns mx-5" key={index}>
                    {
                        courseRow.map((course) => (
                            <CourseCard
                                userId={userId}
                                course={course}
                                key={course.id}
                                deleteCourse={deleteCourse}
                                selectCourse={selectCourse}/>
                        ))
                    }
                </div>
            ))
        }
        <span id="addNewCourseBottom"
              className="fa-stack fa-1x"
              role="button"
              onClick={() => addCourse(userId, {
                  "title": "New Course",
                  "modules": []
              })}>
            <i className="fas fa-circle fa-stack-2x"/>
            <i className="fas fa-plus fa-stack-1x fa-inverse"/>
        </span>
    </div>;

const getCardRows = (courses) => {
    let length = courses.length;
    let numOfRows = ((length <= 6) ?
        1 : ((length % 6 === 0) ?
            length / 6 : (length / 6 + 1)));
    let cardRows = [];
    for (let i = 0; i < numOfRows; i++) {
        let cardRow = [];
        if (i === numOfRows - 1) {
            cardRow = [courses.slice(i * 6)];
        } else {
            cardRow = [courses.slice(i * 6, i * 6 + 6)];
        }
        cardRows = cardRows.concat(cardRow)
    }
    return cardRows;
};

export default CourseGrid;