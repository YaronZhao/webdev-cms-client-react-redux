let baseURL = "http://localhost:8080/api/user/";

class WidgetService {
    static widgetService = null;

    static getInstance() {
        if (WidgetService.widgetService === null) {
            WidgetService.widgetService = new WidgetService();
        }
        return WidgetService.widgetService
    }

    createWidget = (userId, courseId, moduleId, lessonId, topicId, newWidget) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/"
            + moduleId + "/lesson/" + lessonId + "/topic/" + topicId + "/widget", {
            method: 'POST',
            body: JSON.stringify(newWidget),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    findAllWidgets = (userId, courseId, moduleId, lessonId, topicId) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/"
            + moduleId + "/lesson/" + lessonId + "/topic/" + topicId + "/widgets", {
            credentials: 'include',
        }).then(response => response.json());

    findWidgetById = (userId, courseId, moduleId, lessonId, topicId, widgetId) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/"
            + moduleId + "/lesson/" + lessonId + "/topic/" + topicId + "/widget/" + widgetId, {
            credentials: 'include',
        }).then(response => response.json());

    updateWidget = (userId, courseId, moduleId, lessonId, topicId, widgetId, updatedWidget) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/"
            + moduleId + "/lesson/" + lessonId + "/topic/" + topicId + "/widget/" + widgetId, {
            method: 'PUT',
            body: JSON.stringify(updatedWidget),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    deleteWidget = (userId, courseId, moduleId, lessonId, topicId, widgetId) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/"
            + moduleId + "/lesson/" + lessonId + "/topic/" + topicId + "/widget/" + widgetId, {
            method: 'DELETE',
            credentials: 'include',
        });
}

export default WidgetService;