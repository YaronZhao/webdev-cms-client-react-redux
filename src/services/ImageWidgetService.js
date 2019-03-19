let baseURL = "http://localhost:8080/api/user/";

class ImageWidgetService {
    static imageWidgetService = null;

    static getInstance() {
        if (ImageWidgetService.imageWidgetService === null) {
            ImageWidgetService.imageWidgetService = new ImageWidgetService();
        }
    }

    createImageWidget = (userId, courseId, moduleId,
                        lessonId, topicId, newImageWidget) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId
            + "/lesson/" + lessonId + "/topic/" + topicId + "/image/widget", {
            method: 'POST',
            body: JSON.stringify(newImageWidget),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    findAllImageWidgets = (userId, courseId, moduleId, lessonId, topicId) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId
            + "/lesson/" + lessonId + "/topic/" + topicId + "/image/widgets", {
            credentials: 'include',
        }).then(response => response.json());

    findImageWidgetById = (userId, courseId, moduleId,
                          lessonId, topicId, widgetId) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId
            + "/lesson/" + lessonId + "/topic/" + topicId + "/image/widget/" + widgetId, {
            credentials: 'include',
        }).then(response => response.json());

    updateImageWidget = (userId, courseId, moduleId, lessonId,
                        topicId, widgetId, updatedImageWidget) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId
            + "/lesson/" + lessonId + "/topic/" + topicId + "/image/widget/" + widgetId, {
            method: 'PUT',
            body: JSON.stringify(updatedImageWidget),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    deleteImageWidget = (userId, courseId, moduleId, lessonId, topicId, widgetId) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId
            + "/lesson/" + lessonId + "/topic/" + topicId + "/image/widget/" + widgetId, {
            method: 'DELETE',
            credentials: 'include',
        });
}

export default ImageWidgetService;