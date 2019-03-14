let baseURL = "https://murmuring-temple-45999.herokuapp.com/api/";

class TopicService {
    static topicService = null;

    static getInstance() {
        if (TopicService.topicService === null) {
            TopicService.topicService = new TopicService();
        }
        return TopicService.topicService
    }

    createTopic = (lessonId, newTopic) =>
        fetch(baseURL + "lesson/" + lessonId + "/topic", {
            method: 'POST',
            body: JSON.stringify(newTopic),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    findAllTopics = lessonId =>
        fetch(baseURL + "lesson/" + lessonId + "/topics", {
            credentials: 'include',
        }).then(response => response.json());

    findTopicById = topicId =>
        fetch(baseURL + "topic/" + topicId, {
            credentials: 'include',
        }).then(response => response.json());

    updateTopic = (topicId, updatedTopic) =>
        fetch(baseURL + "topic/" + topicId, {
            method: 'PUT',
            body: JSON.stringify(updatedTopic),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    deleteTopic = topicId =>
        fetch(baseURL + "topic/" + topicId, {
            method: 'DELETE',
            credentials: 'include',
        });
}

export default TopicService;