import React, {Component} from 'react'
import TopicPill from "./TopicPill";

class TopicPills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTopicTitle: ""
        }
    }

    updateForm = event => {
        this.setState({
            newTopicTitle: event.target.value
        });
    };

    render() {
        return (
            <div id="topic-pills" className="mt-3 mr-1">
                <ul className="nav nav-pills">
                    {
                        this.props.topics.map((topic, index) => (
                            <TopicPill
                                key={index}
                                index={index}
                                userId={this.props.userId}
                                courseId={this.props.courseId}
                                moduleId={this.props.moduleId}
                                lessonId={this.props.lessonId}
                                topic={topic}
                                topicId={topic.id}
                                selected={this.props.selectedTopic === topic}
                                selectTopic={this.props.selectTopic}
                                updateTopic={this.props.updateTopic}
                                deleteTopic={this.props.deleteTopic}/>
                        ))
                    }
                    <li className="nav-item ml-3 pt-1">
                        <span>
                            <input id="newTopicName"
                                   type="text"
                                   onChange={this.updateForm}/>
                            <button id="addNewTopicBtn"
                                    className="ml-3 btn-secondary"
                                    onClick={() =>
                                            this.props.createTopic(
                                                this.props.userId,
                                                this.props.courseId,
                                                this.props.moduleId,
                                                this.props.lessonId,
                                                {
                                                    "title": (this.state.newTopicTitle === "") ?
                                                           "New Topic" : this.state.newTopicTitle,
                                                    "widgets": []
                                                })}>
                                +
                            </button>
                        </span>
                    </li>
                </ul>
            </div>
        )
    }
}

export default TopicPills