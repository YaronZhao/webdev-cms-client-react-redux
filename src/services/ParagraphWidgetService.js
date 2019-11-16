let baseURL = "https://webdev-cms-server-mysql-jpa.herokuapp.com/api/user/";

class ParagraphWidgetService {
    static paragraphWidgetService = null;

    static getInstance() {
        if (ParagraphWidgetService.paragraphWidgetService === null) {
            ParagraphWidgetService.paragraphWidgetService = new ParagraphWidgetService()
        }
        return ParagraphWidgetService.paragraphWidgetService
    }

    createParagraphWidget = (userId, courseId, moduleId,
                             lessonId, topicId, newParagraphWidget) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId
            + "/lesson/" + lessonId + "/topic/" + topicId + "/paragraph/widget", {
            method: 'POST',
            body: JSON.stringify(newParagraphWidget),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    findAllParagraphWidgets = (userId, courseId, moduleId, lessonId, topicId) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId
            + "/lesson/" + lessonId + "/topic/" + topicId + "/paragraph/widgets", {
            credentials: 'include',
        }).then(response => response.json());

    findParagraphWidgetById = (userId, courseId, moduleId,
                               lessonId, topicId, widgetId) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId
            + "/lesson/" + lessonId + "/topic/" + topicId + "/paragraph/widget/" + widgetId, {
            credentials: 'include',
        }).then(response => response.json());

    updateParagraphWidget = (userId, courseId, moduleId, lessonId,
                             topicId, widgetId, updatedParagraphWidget) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId
            + "/lesson/" + lessonId + "/topic/" + topicId + "/paragraph/widget/" + widgetId, {
            method: 'PUT',
            body: JSON.stringify(updatedParagraphWidget),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    deleteParagraphWidget = (userId, courseId, moduleId, lessonId, topicId, widgetId) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId
            + "/lesson/" + lessonId + "/topic/" + topicId + "/paragraph/widget/" + widgetId, {
            method: 'DELETE',
            credentials: 'include',
        });
}

export default ParagraphWidgetService;
