import { correctLogin, logIn } from '../local-storage-utils.js';

const loginForm = document.querySelector('form');
const section = document.querySelector('section');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const username = formData.get('username');
    const password = formData.get('password');
    

    if (correctLogin(username, password)) {
        logIn(username);
        window.location = '../game-config/index.html';
    } else {
        const div = document.createElement('div');
        div.textContent = 'Incorrect Login Credentials';
        section.append(div);
    }

});