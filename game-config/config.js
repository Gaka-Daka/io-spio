import { generateTableOfContents } from './config-utils.js';
import { createGame, updateGame } from '../game-utils.js';
import { checkIfAUserIsLoggedIn } from '../local-storage-utils.js';
checkIfAUserIsLoggedIn();


const form = document.querySelector('form');
const audioButton = document.getElementById('audio');


generateTableOfContents();

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const time = formData.get('time');
    const difficulty = formData.get('difficulty');

    const game = createGame();
    game.time = Number(time) * 60;
    game.difficulty = difficulty;
    updateGame(game);

});


audioButton.addEventListener('click', () => {
    // might be more maintainable like this
    const queryParams = `
        height=500,
        width=500,
        left=100
        top=100
        resizable=yes
        scrollbars=yes
        toolbar=yes
        menubar=no
        location=no
        directories=no
        status=yes`;

    window.open('../music', 'popUpWindow', queryParams);
});

