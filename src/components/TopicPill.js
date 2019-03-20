import React from 'react'

const TopicPill = ({index, userId, courseId, moduleId, lessonId, topics,
                    topic, topicId, selected, selectTopic, updateTopic, deleteTopic}) =>
    <li className="nav-item ml-3 mb-2">
        <span className={selected ? "btn bg-secondary topic-span py-0 active-topic" :
                                    "btn bg-secondary topic-span py-0"}
              onClick={() => selectTopic(topics, topic)}>
            <input id={"topic-" + index}
                   className="btn px-0 topic-title"
                   contentEditable="true"
                   type="text"
                   placeholder={(topic.title === "") ? "New Topic" : topic.title}/>
            <span className="topic-action-span">
                <i className="fas fa-pencil-alt ml-2 topic-edit"
                   role="button"
                   onClick={() => {
                       let inputId = "topic-" + index;
                       document.getElementById(inputId).focus();
                   }}/>
            </span>
            <span className="topic-action-span">
                <i className="fas fa-save ml-2 topic-save"
                   role="button"
                   onClick={() => {
                       let inputId = "topic-" + index;
                       let newTitle = document.getElementById(inputId).value;
                       document.getElementById(inputId).blur();
                       updateTopic(userId, courseId, moduleId, lessonId, topicId, {
                           "id": topic.id,
                           "title": newTitle,
                           "widgets": topic.widgets
                       })
                   }}/>
            </span>
            <span className="topic-action-span">
                <i className="fas fa-minus-circle ml-2 topic-delete"
                   role="button"
                   onClick={() => deleteTopic(userId, courseId, moduleId, lessonId, topicId)}/>
            </span>
        </span>
    </li>;

export default TopicPill