let baseURL = "https://webdev-cms-server-mysql-jpa.herokuapp.com/api/user/";

class ListWidgetService {
    static listWidgetService = null;

    static getInstance() {
        if (ListWidgetService.listWidgetService === null) {
            ListWidgetService.listWidgetService = new ListWidgetService();
        }
        return ListWidgetService.listWidgetService
    }

    createListWidget = (userId, courseId, moduleId,
                             lessonId, topicId, newListWidget) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId
            + "/lesson/" + lessonId + "/topic/" + topicId + "/list/widget", {
            method: 'POST',
            body: JSON.stringify(newListWidget),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    findAllListWidgets = (userId, courseId, moduleId, lessonId, topicId) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId
            + "/lesson/" + lessonId + "/topic/" + topicId + "/list/widgets", {
            credentials: 'include',
        }).then(response => response.json());

    findListWidgetById = (userId, courseId, moduleId,
                               lessonId, topicId, widgetId) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId
            + "/lesson/" + lessonId + "/topic/" + topicId + "/list/widget/" + widgetId, {
            credentials: 'include',
        }).then(response => response.json());

    updateListWidget = (userId, courseId, moduleId, lessonId,
                             topicId, widgetId, updatedListWidget) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId
            + "/lesson/" + lessonId + "/topic/" + topicId + "/list/widget/" + widgetId, {
            method: 'PUT',
            body: JSON.stringify(updatedListWidget),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    deleteListWidget = (userId, courseId, moduleId, lessonId, topicId, widgetId) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId
            + "/lesson/" + lessonId + "/topic/" + topicId + "/list/widget/" + widgetId, {
            method: 'DELETE',
            credentials: 'include',
        });
}

export default ListWidgetService;
