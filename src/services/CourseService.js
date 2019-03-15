import widgets from './widgets'

let baseURL = "http://localhost:8080/api/user/";

class CourseService {
    static courseService = null;

    constructor() {
        this.widgets = widgets;
    }

    static getInstance() {
        if (CourseService.courseService === null) {
            CourseService.courseService = new CourseService();
        }
        return CourseService.courseService;
    }

    createCourse = (userId, newCourse) =>
        fetch(baseURL + userId + "/course", {
            method: 'POST',
            body: JSON.stringify(newCourse),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    findAllCourses = userId =>
        fetch(baseURL + userId + "/courses", {
            credentials: 'include'
        }).then(response => response.json());

    findCourseById = (userId, courseId) =>
        fetch(baseURL + userId + "/course/" + courseId, {
            credentials: 'include'
        }).then(response => response.json());

    updateCourse = (userId, courseId, updatedCourse) =>
        fetch(baseURL + userId + "/course/" + courseId, {
            method: 'PUT',
            body: JSON.stringify(updatedCourse),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    deleteCourse = (userId, courseId) =>
        fetch(baseURL + userId + "/course/" + courseId, {
            method: 'DELETE',
            credentials: 'include'
        });

    findWidgets = topicId => {
        return this.widgets
    };

    createWidget = (topicId, widget) => {
        this.widgets.push(widget)
    };

    findWidget = widgetId => {
        if (widgetId !== null) {
            for (let widget of this.widgets) {
                if (widget.id === widgetId) {
                    return widget
                }
            }
        }
        return null;
    };

    updateWidget = (widgetId, widget) => {
        if (widgetId !== null) {
            for (let w in this.widgets) {
                if (this.widgets[w].id === widgetId) {
                    this.widgets[w] = widget
                }
            }
        }
    };

    deleteWidget = widgetId => {
        if (widgetId !== null) {
            for (let w in this.widgets) {
                if (this.widgets[w].id === widgetId) {
                    this.widgets.splice(w, 1)
                }
            }
        }
    };

    findAllWidgets = () => {
        return this.widgets
    };

    moveWidgetUp = (widgetId, fromIndex) => {
        if (widgetId !== null && fromIndex !== null) {
            for (let w in this.widgets) {
                if (this.widgets[w].id === widgetId) {
                    this.widgets.splice(fromIndex - 1, 0,
                        this.widgets.splice(fromIndex, 1)[0])
                }
            }
        }
    };

    moveWidgetDown = (widgetId, fromIndex) => {
        if (widgetId !== null && fromIndex !== null) {
            for (let w in this.widgets) {
                if (this.widgets[w].id === widgetId) {
                    var nextWidgetTemp = this.widgets[fromIndex + 1];
                    this.widgets[fromIndex + 1] = this.widgets[fromIndex];
                    this.widgets[w] = nextWidgetTemp
                }
            }
        }
    };

    saveWidgetList = (topicId, widgets) => {
        this.widgets = widgets
    };
}

export default CourseService;