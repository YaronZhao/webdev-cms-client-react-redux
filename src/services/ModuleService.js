let baseURL = "https://webdev-cms-server-mysql-jpa.herokuapp.com/api/user/";

class ModuleService {
    static moduleService = null;

    static getInstance() {
        if (ModuleService.moduleService === null) {
            ModuleService.moduleService = new ModuleService();
        }
        return ModuleService.moduleService
    }

    createModule = (userId, courseId, newModule) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module", {
            method: 'POST',
            body: JSON.stringify(newModule),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    findAllModules = (userId, courseId) =>
        fetch(baseURL + userId + "/course/" + courseId + "/modules", {
            credentials: 'include'
        }).then(response => response.json());

    findModuleById = (userId, courseId, moduleId) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId, {
            credentials: 'include'
        }).then(response => response.json());

    updateModule = (userId, courseId, moduleId, updatedModule) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId, {
            method: 'PUT',
            body: JSON.stringify(updatedModule),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    deleteModule = (userId, courseId, moduleId) =>
        fetch(baseURL + userId + "/course/" + courseId + "/module/" + moduleId, {
            method: 'DELETE',
            credentials: 'include'
        });
}

export default ModuleService;
