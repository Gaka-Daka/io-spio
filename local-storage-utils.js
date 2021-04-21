const USER = 'USER';
const LOGGED_IN = 'LOGGED_IN';

export function createUser(username, password) {
    const user = {
        username,
        password,
        games: []
    };

    updateUser(user);
}

export function updateUser(user) {
    const stringyUser = JSON.stringify(user);

    localStorage.setItem(USER, stringyUser);
}

export function getUser() {
    const stringyUser = localStorage.getItem(USER);
    const parsedUser = JSON.parse(stringyUser);

    return parsedUser;
}

export function userExists(username) {
    const storedUser = getUser();
    if (!storedUser) return false;

    return username === storedUser.username;
}

export function correctLogin(username, password) {
    const user = getUser();

    if (user.username === username && user.password === password) {
        return true;
    } return false;
}

export function logIn(username) {

    localStorage.setItem(LOGGED_IN, username);
}

export function logout() {

    localStorage.setItem(LOGGED_IN, null);
}




export function checkIfAUserIsLoggedIn() {
    const logged_in = localStorage.getItem('LOGGED_IN');

    if (!logged_in) {
        window.location = '../index.html';
    } else return;
}