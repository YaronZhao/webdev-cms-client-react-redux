let baseURL = "https://murmuring-temple-45999.herokuapp.com/api/";

class LessonService {
    static lessonService = null;

    static getInstance() {
        if (LessonService.lessonService === null) {
            LessonService.lessonService = new LessonService();
        }
        return LessonService.lessonService
    }

    createLesson = (moduleId, newLesson) =>
        fetch(baseURL + "module/" + moduleId + "/lesson", {
            method: 'POST',
            body: JSON.stringify(newLesson),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    findAllLessons = moduleId =>
        fetch(baseURL + "module/" + moduleId + "/lessons", {
            credentials: 'include',
        }).then(response => response.json());

    findLessonById = lessonId =>
        fetch(baseURL + "lesson/" + lessonId, {
            credentials: 'include',
        }).then(response => response.json());

    updateLesson = (lessonId, updatedLesson) =>
        fetch(baseURL + "lesson/" + lessonId, {
            method: 'PUT',
            body: JSON.stringify(updatedLesson),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    deleteLesson = lessonId =>
        fetch(baseURL + "lesson/" + lessonId, {
            method: 'DELETE',
            credentials: 'include'
        });
}

export default LessonService;