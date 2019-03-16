import React, {Component} from 'react'
import CourseService from '../services/CourseService'
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

const store = createStore(widgetReducer);

class CourseEditor extends Component {
    constructor(props) {
        super(props);
        this.courseService = CourseService.getInstance();
        this.moduleService = ModuleService.getInstance();
        this.lessonService = LessonService.getInstance();
        this.topicService = TopicService.getInstance();
        this.courseId = this.props.match.params.id;
        this.state = {
            userId: this.props.userId,
            courseId: this.courseId,
            course: {},
            modules: [],
            lessons: [],
            topics: [],
            selectedModule: {},
            selectedLesson: {},
            selectedTopic: {}
        }
    }

    componentDidMount() {
        this.courseService.findCourseById(this.state.userId, this.courseId)
            .then(course => this.setState({
                course: course,
                modules: course.modules,
                lessons: course.modules.length === 0 ? [] : course.modules[0].lessons,
                topics:
                    (course.modules.length === 0 ?
                        [] :
                        (course.modules[0].lessons.length === 0) ?
                            [] :
                            course.modules[0].lessons[0].topics),
                selectedModule: (course.modules.length === 0 ? {} : course.modules[0]),
                selectedLesson:
                    (course.modules.length === 0 ?
                        {} :
                        (course.modules[0].lessons.length === 0 ?
                            {} :
                            course.modules[0].lessons[0])),
                selectedTopic:
                    (course.modules.length === 0 ?
                        {} :
                        (course.modules[0].lessons.length === 0) ?
                            {} :
                            (course.modules[0].lessons[0].topics.length === 0 ?
                                {} :
                                course.modules[0].lessons[0].topics[0]))
            }))
    }

    selectModule = module => {
        this.setState({
            selectedModule: module,
            lessons: module === {} ? [] : module.lessons,
            topics:
                (module === {} ?
                    [] :
                    (module.lessons.length === 0 ?
                        [] :
                        module.lessons[0].topics)),
            selectedLesson:
                (module === {} ?
                    {} :
                    (module.lessons.length === 0 ?
                        {} :
                        module.lessons[0])),
            selectedTopic:
                (module === {} ?
                    {} :
                    (module.lessons.length === 0 ?
                        {} :
                        (module.lessons[0].topics.length === 0 ?
                            {} : module.lessons[0].topics[0])))
        })
    };

    findAllModules = () => {
        this.moduleService.findAllModules(this.state.userId, this.state.courseId)
            .then(modules => {
                if (modules.length === this.state.modules.length + 1) {
                    this.setState({
                        modules: modules
                    });
                    this.selectModule(modules[modules.length - 1])
                } else if (modules.length === 0) {
                    this.setState({
                        modules: [],
                        lessons: [],
                        topics: [],
                        selectedModule: {},
                        selectedLesson: {},
                        selectedTopic: {}
                    })
                } else {
                    this.setState({
                        modules: modules
                    });
                    this.selectModule(modules[0])
                }
            })
    };

    createModule = (userId, courseId, newModule) => {
        this.moduleService.createModule(userId, courseId, newModule)
            .then(module => {
                console.log("New module: " + module);
                this.findAllModules()
            });
        document.getElementById("newModuleName").value = ""
    };

    updateModule = (userId, courseId, moduleId, updatedModule) => {
        this.moduleService.updateModule(userId, courseId, moduleId, updatedModule)
            .then(module => {
                console.log("Updated module: " + module);
                this.findAllModules()
            })
    };

    deleteModule = (userId, courseId, moduleId) => {
        this.moduleService.deleteModule(userId, courseId, moduleId)
            .then(() => this.findAllModules())
    };

    selectLesson = lesson => {
        this.setState({
            selectedLesson: lesson,
            topics: lesson === {} ? [] : lesson.topics,
            selectedTopic:
                (lesson === {} ?
                    {} :
                    lesson.topics.length === 0 ?
                        {} :
                        lesson.topics[0])

        })
    };

    createLesson = (userId, courseId, moduleId, newLesson) => {
        this.lessonService.createLesson(userId, courseId, moduleId, newLesson)
            .then(lesson => {
                console.log("New lesson: " + lesson);
                this.findAllModules()
            });
        document.getElementById("newLessonTitle").value = ""
    };

    updateLesson = (userId, courseId, moduleId, lessonId, updatedLesson) => {
        this.lessonService.updateLesson(userId, courseId, moduleId, lessonId, updatedLesson)
            .then(lesson => {
                console.log("Updated lesson: " + lesson);
                this.findAllModules()
            })
    };

    deleteLesson = (userId, courseId, moduleId, lessonId) => {
        this.lessonService.deleteLesson(userId, courseId, moduleId, lessonId)
            .then(() => this.findAllModules())
    };

    selectTopic = topic => {
        this.setState({
            selectedTopic: topic
        })
    };

    createTopic = (userId, courseId, moduleId, lessonId, newTopic) => {
        this.topicService.createTopic(userId, courseId, moduleId, lessonId, newTopic)
            .then(topic => {
                console.log("New topic: " + topic);
                this.findAllModules()
            });
        document.getElementById("newTopicName").value = ""
    };

    updateTopic = (userId, courseId, moduleId, lessonId, topicId, updatedTopic) => {
        this.topicService.updateTopic(userId, courseId, moduleId, lessonId, topicId, updatedTopic)
            .then(topic => {
                console.log("Updated topic: " + topic);
                this.findAllModules()
            })
    };

    deleteTopic = (userId, courseId, moduleId, lessonId, topicId) => {
        this.topicService.deleteTopic(userId, courseId, moduleId, lessonId, topicId)
            .then(() => this.findAllModules())
    };

    render() {
        return(
            <div>
                <LessonTabs
                    courseTitle={this.state.course.title}
                    userId={this.state.userId}
                    courseId={this.state.courseId}
                    moduleId={this.state.selectedModule === {} ? null : this.state.selectedModule.id}
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
                            moduleId={this.state.selectedModule === {} ? null : this.state.selectedModule.id}
                            lessonId={this.state.selectedLesson === {} ? null : this.state.selectedLesson.id}
                            topics={this.state.topics}
                            selectedTopic={this.state.selectedTopic}
                            selectTopic={this.selectTopic}
                            createTopic={this.createTopic}
                            updateTopic={this.updateTopic}
                            deleteTopic={this.deleteTopic}/>
                        <Provider store={store}>
                            <WidgetListContainer
                                topicId="9999"/>
                        </Provider>
                    </div>
                </div>
            </div>
        )
    }
}

export default CourseEditor;
