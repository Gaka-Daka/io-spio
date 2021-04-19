const newButton = document.getElementById('new-user');
const loginButton = document.getElementById('login');


newButton.addEventListener('click', () => {
    window.location = '../signup/index.html';
});

loginButton.addEventListener('click', () => {
    window.location = '../login/index.html';
});