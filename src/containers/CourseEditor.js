import React, {Component} from 'react'
import LessonTabs from "../components/LessonTabs";
import ModuleList from "../components/ModuleList";
import TopicPills from "../components/TopicPills";
import widgetReducer from '../reducers/WidgetReducer'
import {createStore} from "redux";
import {Provider} from 'react-redux'
import WidgetListContainer from './WidgetListContainer'
import ModuleService from "../services/ModuleService";
import LessonService from "../services/LessonService";
import TopicService from "../services/TopicService";
import WidgetService from "../services/WidgetService";

const store = createStore(widgetReducer);

class CourseEditor extends Component {
    constructor(props) {
        super(props);
        this.moduleService = ModuleService.getInstance();
        this.lessonService = LessonService.getInstance();
        this.topicService = TopicService.getInstance();
        this.widgetService = WidgetService.getInstance();
        this.courseId = this.props.match.params.id;
        this.state = {
            userId: this.props.userId,
            courseId: this.courseId,
            course: null,
            modules: [],
            lessons: [],
            topics: [],
            selectedModule: null,
            selectedLesson: null,
            selectedTopic: null
        }
    }

    componentDidMount() {
        this.findAllModules(this.state.userId, this.courseId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.selectedTopic !== null
            && prevState.selectedTopic !== this.state.selectedTopic) {
            this.widgetService.findAllWidgets(
                this.state.userId,
                this.state.courseId,
                this.state.selectedModule.id,
                this.state.selectedLesson.id,
                this.state.selectedTopic.id
            ).then(widgets => store.dispatch({
                type: "FIND_ALL_WIDGETS_FOR_TOPIC",
                widgets: widgets,
                previewing: false
            }))
        } else {
            store.dispatch({
                type: "FIND_ALL_WIDGETS_FOR_TOPIC",
                widgets: [],
                previewing: false
            })
        }
    }

    selectModule = (modules, module) => {
        if (this.state.selectedModule !== module) {
            this.setState({
                modules: modules,
                selectedModule: module,
                lessons: module.lessons,
                topics:
                     module.lessons.length === 0 ?
                        [] :
                        module.lessons[0].topics,
                selectedLesson:
                     module.lessons.length === 0 ?
                        null :
                        module.lessons[0],
                selectedTopic:
                    (module.lessons.length === 0 ?
                        null :
                        (module.lessons[0].topics.length === 0 ?
                            null : module.lessons[0].topics[0]))
            })
        }
    };

    findAllModules = (userId, courseId) => {
        this.moduleService.findAllModules(userId, courseId)
            .then(modules => {
                if (modules.length === this.state.modules.length + 1) {
                    this.selectModule(modules, modules[modules.length - 1])
                } else if (modules.length === 0) {
                    this.setState({
                        modules: [],
                        lessons: [],
                        topics: [],
                        selectedModule: null,
                        selectedLesson: null,
                        selectedTopic: null
                    })
                } else {
                    this.selectModule(modules, modules[0])
                }
            })
    };

    createModule = (userId, courseId, newModule) => {
        this.moduleService.createModule(userId, courseId, newModule)
            .then(module => {
                console.log("New module: " + module);
                this.findAllModules(this.state.userId, this.state.courseId)
            });
        document.getElementById("newModuleName").value = ""
    };

    updateModule = (userId, courseId, moduleId, updatedModule) => {
        this.moduleService.updateModule(userId, courseId, moduleId, updatedModule)
            .then(module => {
                console.log("Updated module: " + module);
                this.findAllModules(this.state.userId, this.state.courseId)
            })
    };

    deleteModule = (userId, courseId, moduleId) => {
        this.moduleService.deleteModule(userId, courseId, moduleId)
            .then(() => this.findAllModules(this.state.userId, this.state.courseId))
    };

    selectLesson = (lessons, lesson) => {
        if (this.state.selectedLesson !== lesson) {
            this.setState({
                lessons: lessons,
                selectedLesson: lesson,
                topics: lesson.topics,
                selectedTopic:
                    lesson.topics.length === 0 ?
                        null :
                        lesson.topics[0]
            })
        }
    };

    findAllLessons = () => {
        this.lessonService.findAllLessons(
            this.state.userId,
            this.state.courseId,
            this.state.selectedModule.id)
            .then(lessons => {
                if (lessons.length === this.state.lessons.length + 1) {
                    this.selectLesson(lessons, lessons[lessons.length - 1])
                } else if (lessons.length === 0) {
                    this.setState({
                        lessons: [],
                        topics: [],
                        selectedLesson: null,
                        selectedTopic: null
                    })
                } else {
                    this.selectLesson(lessons, lessons[0])
                }
            })
    };

    createLesson = (userId, courseId, moduleId, newLesson) => {
        this.lessonService.createLesson(userId, courseId, moduleId, newLesson)
            .then(lesson => {
                console.log("New lesson: " + lesson);
                this.findAllLessons()
            });
        document.getElementById("newLessonTitle").value = ""
    };

    updateLesson = (userId, courseId, moduleId, lessonId, updatedLesson) => {
        this.lessonService.updateLesson(userId, courseId, moduleId, lessonId, updatedLesson)
            .then(lesson => {
                console.log("Updated lesson: " + lesson);
                this.findAllLessons()
            })
    };

    deleteLesson = (userId, courseId, moduleId, lessonId) => {
        this.lessonService.deleteLesson(userId, courseId, moduleId, lessonId)
            .then(() => this.findAllLessons())
    };

    selectTopic = (topics, topic) => {
        if (this.state.selectedTopic !== topic) {
            this.setState({
                topics: topics,
                selectedTopic: topic
            })
        }
    };

    findAllTopics = () => {
        this.topicService.findAllTopics(
            this.state.userId,
            this.state.courseId,
            this.state.selectedModule.id,
            this.state.selectedLesson.id)
            .then(topics => {
                if (topics.length === this.state.topics.length + 1) {
                    this.selectTopic(topics, topics[topics.length - 1])
                } else if (topics.length === 0) {
                    this.setState({
                        topics: [],
                        selectedTopic: null
                    })
                } else {
                    this.selectTopic(topics, topics[0])
                }
            })
    };

    createTopic = (userId, courseId, moduleId, lessonId, newTopic) => {
        this.topicService.createTopic(userId, courseId, moduleId, lessonId, newTopic)
            .then(topic => {
                console.log("New topic: " + topic);
                this.findAllTopics()
            });
        document.getElementById("newTopicName").value = ""
    };

    updateTopic = (userId, courseId, moduleId, lessonId, topicId, updatedTopic) => {
        this.topicService.updateTopic(userId, courseId, moduleId, lessonId, topicId, updatedTopic)
            .then(topic => {
                this.findAllTopics()
            })
    };

    deleteTopic = (userId, courseId, moduleId, lessonId, topicId) => {
        this.topicService.deleteTopic(userId, courseId, moduleId, lessonId, topicId)
            .then(() => this.findAllTopics())
    };

    render() {
        return(
            <div>
                <LessonTabs
                    courseTitle={this.props.courseTitle}
                    userId={this.state.userId}
                    courseId={this.state.courseId}
                    moduleId={this.state.selectedModule === null ? null : this.state.selectedModule.id}
                    lessons={this.state.lessons}
                    selectedLesson={this.state.selectedLesson}
                    selectLesson={this.selectLesson}
                    createLesson={this.createLesson}
                    updateLesson={this.updateLesson}
                    deleteLesson={this.deleteLesson}/>
                <div id="modules-and-content" className="row mx-0">
                    <ModuleList
                        userId={this.state.userId}
                        courseId={this.state.courseId}
                        modules={this.state.modules}
                        selectedModule={this.state.selectedModule}
                        selectModule={this.selectModule}
                        createModule={this.createModule}
                        updateModule={this.updateModule}
                        deleteModule={this.deleteModule}/>
                    <div id="content" className="col-9 px-0" style={{overflow: 'auto'}}>
                        <TopicPills
                            userId={this.state.userId}
                            courseId={this.state.courseId}
                            moduleId={this.state.selectedModule === null ? null : this.state.selectedModule.id}
                            lessonId={this.state.selectedLesson === null ? null : this.state.selectedLesson.id}
                            topics={this.state.topics}
                            selectedTopic={this.state.selectedTopic}
                            selectTopic={this.selectTopic}
                            createTopic={this.createTopic}
                            updateTopic={this.updateTopic}
                            deleteTopic={this.deleteTopic}/>
                        {
                            this.state.selectedTopic !== null &&
                            <Provider store={store}>
                                <WidgetListContainer
                                    userId={this.state.userId}
                                    courseId={this.state.courseId}
                                    moduleId={this.state.selectedModule === null ? null : this.state.selectedModule.id}
                                    lessonId={this.state.selectedLesson === null ? null : this.state.selectedLesson.id}
                                    topicId={this.state.selectedTopic === null ? null : this.state.selectedTopic.id}/>
                            </Provider>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default CourseEditor;
