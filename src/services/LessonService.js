let baseURL = "https://webdev-cms-server-mysql-jpa.herokuapp.com/api/user/";

class LessonService {
    static lessonService = null;

    static getInstance() {
        if (LessonService.lessonService === null) {
            LessonService.lessonService = new LessonService();
        }
        return LessonService.lessonService
    }

    createLesson = (userId, courseId, moduleId, newLesson) =>
        fetch(baseURL + userId + "/course/" + courseId +
                    "/module/" + moduleId + "/lesson", {
            method: 'POST',
            body: JSON.stringify(newLesson),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    findAllLessons = (userId, courseId, moduleId) =>
        fetch(baseURL + userId + "/course/" + courseId +
                    "/module/" + moduleId + "/lessons", {
            credentials: 'include',
        }).then(response => response.json());

    findLessonById = (userId, courseId, moduleId, lessonId) =>
        fetch(baseURL + userId + "/course/" + courseId +
                    "/module/" + moduleId + "/lesson/" + lessonId, {
            credentials: 'include',
        }).then(response => response.json());

    updateLesson = (userId, courseId, moduleId, lessonId, updatedLesson) =>
        fetch(baseURL + userId + "/course/" + courseId +
                    "/module/" + moduleId + "/lesson/" + lessonId, {
            method: 'PUT',
            body: JSON.stringify(updatedLesson),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    deleteLesson = (userId, courseId, moduleId, lessonId) =>
        fetch(baseURL + userId + "/course/" + courseId +
                    "/module/" + moduleId + "/lesson/" + lessonId, {
            method: 'DELETE',
            credentials: 'include'
        });
}

export default LessonService;
