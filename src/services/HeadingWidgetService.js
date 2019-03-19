let baseURL = "http://localhost:8080/api/user/";

class HeadingWidgetService {
    static headingWidgetService = null;

    static getInstance() {
        if (HeadingWidgetService.headingWidgetService === null) {
            HeadingWidgetService.headingWidgetService = new HeadingWidgetService();
        }
        return HeadingWidgetService.headingWidgetService
    }

    createHeadingWidget = (userId, courseId, moduleId,
                           lessonId, topicId, newHeadingWidget) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId
            + "/lesson/" + lessonId + "/topic/" + topicId + "/heading/widget", {
            method: 'POST',
            body: JSON.stringify(newHeadingWidget),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    findAllHeadingWidgets = (userId, courseId, moduleId, lessonId, topicId) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId
            + "/lesson/" + lessonId + "/topic/" + topicId + "/heading/widgets", {
            credentials: 'include',
        }).then(response => response.json());

    findHeadingWidgetById = (userId, courseId, moduleId,
                             lessonId, topicId, widgetId) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId
            + "/lesson/" + lessonId + "/topic/" + topicId + "/heading/widget/" + widgetId, {
            credentials: 'include',
        }).then(response => response.json());

    updateHeadingWidget = (userId, courseId, moduleId, lessonId,
                           topicId, widgetId, updatedHeadingWidget) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId
            + "/lesson/" + lessonId + "/topic/" + topicId + "/heading/widget/" + widgetId, {
            method: 'PUT',
            body: JSON.stringify(updatedHeadingWidget),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    deleteHeadingWidget = (userId, courseId, moduleId, lessonId, topicId, widgetId) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId
            + "/lesson/" + lessonId + "/topic/" + topicId + "/heading/widget/" + widgetId, {
            method: 'DELETE',
            credentials: 'include',
        });
}

export default HeadingWidgetService;