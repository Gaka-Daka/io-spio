import { logIn, createUser, userExists, correctLogin } from '../local-storage-utils.js';

const signupForm = document.querySelector('#signup-form');
const signupSection = document.querySelector('.sign-up'); 
const loginForm = document.querySelector('#login-form');
const loginSection = document.querySelector('.login');

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
        signupSection.append(div);
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
        const div = document.createElement('div');
        div.textContent = 'Incorrect Login Credentials';
        loginSection.append(div);
    }

});