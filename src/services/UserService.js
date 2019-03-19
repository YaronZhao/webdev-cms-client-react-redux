let baseURL = "http://localhost:8080/api/";

class UserService {
    static userService = null;

    static getInstance () {
        if (UserService.userService === null) {
            UserService.userService = new UserService();
        }
        return UserService.userService
    }

    register = user =>
        fetch(baseURL + "register", {
            method: 'POST',
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    profile = () =>
        fetch(baseURL + "profile", {
            credentials: 'include',
        }).then(response => response.json());

    login = user => fetch(baseURL + "login", {
        method: 'POST',
        body: JSON.stringify(user),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());

    logout = () =>
        fetch(baseURL + "logout", {
            method: 'POST',
            credentials: 'include'
        });

    findAllUsers = () =>
        fetch(baseURL + "users", {
            credentials: 'include'
        }).then(response => response.json());

    findUserById = userId =>
        fetch(baseURL + "user/" + userId, {
            credentials: 'include'
        }).then(response => response.json());

    updateUser = (userId, updatedUser) =>
        fetch(baseURL + "user/" + userId, {
            method: 'PUT',
            body: JSON.stringify(updatedUser),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

    deleteUser = userId =>
        fetch(baseURL + "user/" + userId, {
            method: 'DELETE',
            credentials: 'include'
        })
}

export default UserService;