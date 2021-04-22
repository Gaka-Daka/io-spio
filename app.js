const newButton = document.getElementById('new-user');

const vid = document.getElementById('logo');
vid.autoplay = true;
vid.loop = true;

newButton.addEventListener('click', () => {
    window.location = './signup/index.html';
});

