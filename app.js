const newButton = document.getElementById('new-user');
const loginButton = document.getElementById('login');
const vid = document.getElementById('logo');
vid.autoplay = true;
vid.loop = true;

newButton.addEventListener('click', () => {
    window.location = './signup/index.html';
});

loginButton.addEventListener('click', () => {
    window.location = './login/index.html';
});