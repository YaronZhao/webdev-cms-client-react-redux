let baseURL = "https://webdev-cms-server-mysql-jpa.herokuapp.com/api/user/";

class LinkWidgetService {
    static linkWidgetService = null;

    static getInstance() {
        if (LinkWidgetService.linkWidgetService === null) {
            LinkWidgetService.linkWidgetService = new LinkWidgetService();
        }
    }

    createLinkWidget = (userId, courseId, moduleId,
                         lessonId, topicId, newLinkWidget) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId
            + "/lesson/" + lessonId + "/topic/" + topicId + "/link/widget", {
            method: 'POST',
            body: JSON.stringify(newLinkWidget),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    findAllLinkWidgets = (userId, courseId, moduleId, lessonId, topicId) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId
            + "/lesson/" + lessonId + "/topic/" + topicId + "/link/widgets", {
            credentials: 'include',
        }).then(response => response.json());

    findLinkWidgetById = (userId, courseId, moduleId,
                           lessonId, topicId, widgetId) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId
            + "/lesson/" + lessonId + "/topic/" + topicId + "/link/widget/" + widgetId, {
            credentials: 'include',
        }).then(response => response.json());

    updateLinkWidget = (userId, courseId, moduleId, lessonId,
                         topicId, widgetId, updatedLinkWidget) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId
            + "/lesson/" + lessonId + "/topic/" + topicId + "/link/widget/" + widgetId, {
            method: 'PUT',
            body: JSON.stringify(updatedLinkWidget),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    deleteLinkWidget = (userId, courseId, moduleId, lessonId, topicId, widgetId) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId
            + "/lesson/" + lessonId + "/topic/" + topicId + "/link/widget/" + widgetId, {
            method: 'DELETE',
            credentials: 'include',
        });
}

export default LinkWidgetService;
