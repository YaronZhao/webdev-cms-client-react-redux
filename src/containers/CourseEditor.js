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
        this.courseService.findCourseById(this.courseId)
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

    findAllModules = courseId => {
        this.moduleService.findAllModules(courseId)
            .then(modules => {
                if (modules.length === this.state.modules.length + 1) {
                    this.setState({
                        modules: modules
                    });
                    this.selectModule(modules[modules.length - 1])
                } else {
                    this.setState({
                        modules: modules
                    });
                    this.selectModule(modules[0])
                }
            })
            .catch(() => this.setState({
                modules: [],
                lessons: [],
                topics: [],
                selectedModule: {},
                selectedLesson: {},
                selectedTopic: {}
            }))
    };

    createModule = (courseId, newModule) => {
        this.moduleService.createModule(courseId, newModule)
            .then(module => {
                console.log("New module: " + module);
                this.findAllModules(courseId);
            });
        document.getElementById("newModuleName").value = ""
    };

    updateModule = (moduleId, updatedModule) => {
        this.moduleService.updateModule(moduleId, updatedModule)
            .then(module => {
                console.log("Updated module: " + module);
                this.findAllModules(this.state.courseId)
            })
    };

    deleteModule = moduleId => {
        this.moduleService.deleteModule(moduleId)
            .then(() => this.findAllModules(this.state.courseId))
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

    createLesson = (moduleId, newLesson) => {
        this.lessonService.createLesson(moduleId, newLesson)
            .then(lesson => {
                console.log("New lesson: " + lesson);
                this.findAllModules(this.state.courseId)
            });
        document.getElementById("newLessonTitle").value = ""
    };

    updateLesson = (lessonId, updatedLesson) => {
        this.lessonService.updateLesson(lessonId, updatedLesson)
            .then(lesson => {
                console.log("Updated lesson: " + lesson);
                this.findAllModules(this.state.courseId)
            })
    };

    deleteLesson = lessonId => {
        this.lessonService.deleteLesson(lessonId)
            .then(() => this.findAllModules(this.state.courseId))
    };

    selectTopic = topic => {
        this.setState({
            selectedTopic: topic
        })
    };

    createTopic = (lessonId, newTopic) => {
        this.topicService.createTopic(lessonId, newTopic)
            .then(topic => {
                console.log("New topic: " + topic);
                this.findAllModules(this.state.courseId)
            });
        document.getElementById("newTopicName").value = ""
    };

    updateTopic = (topicId, updatedTopic) => {
        this.topicService.updateTopic(topicId, updatedTopic)
            .then(topic => {
                console.log("Updated topic: " + topic);
                this.findAllModules(this.state.courseId)
            })
    };

    deleteTopic = topicId => {
        this.topicService.deleteTopic(topicId)
            .then(() => this.findAllModules(this.state.courseId))
    };

    render() {
        return(
            <div>
                <LessonTabs
                    courseTitle={this.state.course.title}
                    moduleId={(this.state.selectedModule === {}) ? null : this.state.selectedModule.id}
                    lessons={this.state.lessons}
                    selectedLesson={this.state.selectedLesson}
                    selectLesson={this.selectLesson}
                    createLesson={this.createLesson}
                    updateLesson={this.updateLesson}
                    deleteLesson={this.deleteLesson}/>
                <div id="modules-and-content" className="row mx-0">
                    <ModuleList
                        courseId={this.state.courseId}
                        modules={this.state.modules}
                        selectedModule={this.state.selectedModule}
                        selectModule={this.selectModule}
                        createModule={this.createModule}
                        updateModule={this.updateModule}
                        deleteModule={this.deleteModule}/>
                    <div id="content" className="col-9 px-0" style={{overflow: 'auto'}}>
                        <TopicPills
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
