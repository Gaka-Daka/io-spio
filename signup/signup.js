const signupForm = document.querySelector('form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(signupForm);
    const username = formData.get('username');
    const password = formData.get('password');
    console.log(username, password);
    window.location = '../game-config/index.html';
});