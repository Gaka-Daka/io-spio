import { logIn, createUser, userExists, correctLogin } from '../local-storage-utils.js';

const signupForm = document.querySelector('#signup-form');
const signupSection = document.querySelector('.left'); 
const loginForm = document.querySelector('#login-form');
const loginSection = document.querySelector('.right');

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
        const previousMessage = document.querySelector('.user-message-signup');
        if (!previousMessage){
            const div = document.createElement('div');
            div.classList.add('user-message-signup');
            div.classList.add('user-message');
            div.textContent = 'User already exists (or you are from the future)';
            signupSection.append(div);
        }
    }
    
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(loginForm);
    const username = formData.get('username');
    const password = formData.get('password');
    

    if (correctLogin(username, password)) {
        logIn(username);
        window.location = '../game-config/index.html';
        
    } else {
        const previousMessage = document.querySelector('.user-message-login');
        if (!previousMessage){
            const div = document.createElement('div');
            div.classList.add('user-message');
            div.classList.add('user-message-login');
            div.textContent = 'Incorrect Login Credentials';
            loginSection.append(div);

        }
    }

});