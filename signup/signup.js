import { logIn, createUser, userExists } from '../local-storage-utils.js';

const signupForm = document.querySelector('form');
const section = document.querySelector('section');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(signupForm);
    const username = formData.get('username');
    const password = formData.get('password');
    
    if (!userExists(username)) {
        createUser(username, password);
        logIn(username);
        window.location = '../game-config/index.html';
    } else {
        const div = document.createElement('div');
        div.textContent = 'User already exists (or you are from the future)';
        section.append(div);
    }
    
});