let baseURL = "https://webdev-cms-server-mysql-jpa.herokuapp.com/api/user/";

class TopicService {
    static topicService = null;

    static getInstance() {
        if (TopicService.topicService === null) {
            TopicService.topicService = new TopicService();
        }
        return TopicService.topicService
    }

    createTopic = (userId, courseId, moduleId, lessonId, newTopic) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/"
                    + moduleId + "/lesson/" + lessonId + "/topic", {
            method: 'POST',
            body: JSON.stringify(newTopic),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    findAllTopics = (userId, courseId, moduleId, lessonId) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/"
                    + moduleId + "/lesson/" + lessonId + "/topics", {
            credentials: 'include',
        }).then(response => response.json());

    findTopicById = (userId, courseId, moduleId, lessonId, topicId) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/"
                    + moduleId + "/lesson/" + lessonId + "/topic/" + topicId, {
            credentials: 'include',
        }).then(response => response.json());

    updateTopic = (userId, courseId, moduleId, lessonId, topicId, updatedTopic) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/"
                    + moduleId + "/lesson/" + lessonId + "/topic/" + topicId, {
            method: 'PUT',
            body: JSON.stringify(updatedTopic),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    deleteTopic = (userId, courseId, moduleId, lessonId, topicId) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/"
                    + moduleId + "/lesson/" + lessonId + "/topic/" + topicId, {
            method: 'DELETE',
            credentials: 'include',
        });
}

export default TopicService;
