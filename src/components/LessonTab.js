import React from 'react'

const LessonTab = ({lessonId, lesson, index, selected, selectLesson, updateLesson, deleteLesson}) =>
    <li className="nav-item w-auto">
        <span role="button"
              className={selected ? "btn btn-dark border-0 p-0 pr-2 mr-2 top-lesson-tabs-btn active" :
                                    "btn btn-dark border-0 p-0 pr-2 mr-2 top-lesson-tabs-btn"}
              onClick={() => selectLesson(lesson)}>
            <input
                id={"lesson-" + index}
                className="btn border-0 p-0 px-2 lesson-title"
                contentEditable="true"
                placeholder={(lesson.title === "") ? "New Lesson" : lesson.title}
                type="text"/>
            <span>
                <i className="fas fa-pencil-alt ml-2 lesson-edit"
                   role="button"
                   onClick={() => {
                       let inputId = "lesson-" + index;
                       document.getElementById(inputId).focus()
                   }}/>
            </span>
            <span>
                <i className="fas fa-save ml-2 lesson-save"
                   role="button"
                   onClick={() => {
                       let inputId = "lesson-" + index;
                       let newTitle = document.getElementById(inputId).value;
                       document.getElementById(inputId).blur();
                       updateLesson(lessonId, {
                           "id": lesson.id,
                           "title": newTitle,
                           "topics": lesson.topics
                       })
                   }}/>
            </span>
            <span>
                <i className="fas fa-minus-circle ml-2 lesson-delete"
                   role="button"
                   onClick={() => deleteLesson(lessonId)}/>
            </span>
        </span>
    </li>;

export default LessonTab;