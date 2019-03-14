let baseURL = "https://murmuring-temple-45999.herokuapp.com/api/";

class ModuleService {
    static moduleService = null;

    static getInstance() {
        if (ModuleService.moduleService === null) {
            ModuleService.moduleService = new ModuleService();
        }
        return ModuleService.moduleService
    }

    createModule = (courseId, newModule) =>
        fetch(baseURL + "course/" + courseId + "/module", {
            method: 'POST',
            body: JSON.stringify(newModule),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    findAllModules = courseId =>
        fetch(baseURL + "course/" + courseId + "/modules", {
            credentials: 'include'
        }).then(response => response.json());

    findModuleById = moduleId =>
        fetch(baseURL + "module/" + moduleId, {
            credentials: 'include'
        }).then(response => response.json());

    updateModule = (moduleId, updatedModule) =>
        fetch(baseURL + "module/" + moduleId, {
            method: 'PUT',
            body: JSON.stringify(updatedModule),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    deleteModule = moduleId =>
        fetch(baseURL + "module/" + moduleId, {
            method: 'DELETE',
            credentials: 'include'
        });
}

export default ModuleService;